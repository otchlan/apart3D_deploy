import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import useApartments from '@/hooks/useApartments';

interface StateColors {
    FREE: number;
    RESERVED: number;
    SOLD: number;
    [key: string]: number;
}

const stateColors: StateColors = {
    FREE: 0x00ff00,     // Green
    RESERVED: 0xffa500, // Orange
    SOLD: 0xff0000      // Red
};


const buildingIdMap: { [key: string]: string } = {
    'Building1MultiObject': '1',
    'Building2MultiObject': '2',
    'Building3MultiObject': '3',
    'Building4MultiObject': '4',
    'Building5MultiObject': '5'
};




const View3D: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [clickedApartmentImage, setClickedApartmentImage] = useState<string | undefined>("/apartments-cards/apartment-card-1.jpeg");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [popup, setPopup] = useState<{visible: boolean, content: string, position: {x: number, y: number}}>({
        visible: false,
        content: '',
        position: {x: 0, y: 0}
    });

    const [activeView, setActiveView] = useState<'all' | 'available' | 'sold' | 'reserved'>('sold');
    
    const { apartments, loading: apartmentsLoading, error } = useApartments();

    useEffect(() => {
        console.log(apartments);
    }, [apartmentsLoading])

    useEffect(() => {
        if (!apartmentsLoading && apartments) {
            console.log('Apartments data loaded:', apartments);
            console.log('Apartment states:', apartments.map(apt => ({
                id: apt.ID,
                state: apt.ApartmentState
            })));
        }
    }, [apartments, apartmentsLoading]);

    const logApartmentData = (buildingName: string) => {
        const buildingId = buildingIdMap[buildingName];
        console.log('Building Name:', buildingName);
        console.log('Building ID:', buildingId);
        console.log('All Apartments:', apartments);
        const apartment = apartments?.find(apt => apt.ID === buildingId);
        console.log('Found Apartment:', apartment);
    };

    const getApartmentState = (buildingName: string): string => {
        if (!apartments || apartmentsLoading || error) {
            console.log('Apartments not loaded or error:', { apartmentsLoading, error });
            return 'free';
        }
        
        const buildingId = buildingIdMap[buildingName];
        const apartment = apartments.find(apt => apt.ID === buildingId);
        
        // Log for debugging
        logApartmentData(buildingName);
        
        if (!apartment) {
            console.log('No apartment found for building:', buildingName);
            return 'free';
        }

        // Make sure we're using uppercase state values
        const state = apartment.ApartmentState?.toUpperCase() || 'free';
        console.log('Apartment State:', state);
        return state;
    };

    const getHoverColor = (buildingName: string): number => {
        const state = getApartmentState(buildingName);
        console.log('Getting hover color for state:', state);
        return stateColors[state as keyof typeof stateColors] || stateColors.free;
    };

    const getApartmentImageUrl = (apartmentId: string) => {
        return `/apartments-cards/apartment-card-${apartmentId}.jpeg`;
    };

    const openImageModal = (apartmentId: string) => {
        if (apartmentId) {
          setIsImageModalVisible(true);
          setClickedApartmentImage(getApartmentImageUrl(apartmentId));
        }
      };

      const closeImageModal = () => {
        setIsImageModalVisible(false);
        setClickedApartmentImage(undefined);
      };

    useEffect(() => {
        if (mountRef.current && !apartmentsLoading && apartments) {
            // Set up the scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            const labelRenderer = new CSS2DRenderer();
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minPolarAngle = Math.PI / 4;
            controls.maxPolarAngle = Math.PI / 2.2;
            controls.enableZoom = false;
            controls.enablePan = false;

            const groundGeometry = new THREE.CircleGeometry(100, 32);

            // Load the texture for the ground
            const textureLoaderGround = new THREE.TextureLoader();
            const groundTexture = textureLoaderGround.load('ground-texture.jpg'); // Replace with the actual path to your texture file

            // Set texture wrapping and repeat
            groundTexture.wrapS = THREE.RepeatWrapping;
            groundTexture.wrapT = THREE.RepeatWrapping;
            groundTexture.repeat.set(32, 32); // Adjust the repetition to your liking

            // Create the ground material with the texture applied
            const groundMaterial = new THREE.MeshStandardMaterial({
                map: groundTexture,
                color: 0x808080, // This color will blend with the texture
                roughness: 0.8,
                metalness: 0.2,
            });

            // Create the ground mesh
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = 0;

            // Add the ground to the scene
            //scene.add(ground);
            
            const textureLoader360 = new THREE.TextureLoader();
            {/*textureLoader360.load(
                '/360-view-ground.jpg', // Replace with your 360° photo path
                (texture) => {
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    scene.background = texture;
                    scene.environment = texture; // This will also affect reflective materials
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    console.error('Error loading 360° texture:', error);
                    // Fallback to solid color if loading fails
                    scene.background = new THREE.Color(0x87CEEB);
                }
            );*/}

            const sphereGeometry = new THREE.SphereGeometry(500, 60, 40, 0, Math.PI * 2, 0, Math.PI / 2);
            // Invert the geometry so that the texture is rendered on the inside
            sphereGeometry.scale(-1, 1, 1);
            
            const sphereMaterial = new THREE.MeshBasicMaterial({
                side: THREE.BackSide,
                transparent: true,
                opacity: 1
            });
            
            const skybox = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(skybox);

            

            // Update the camera's far plane to see the entire skybox
            camera.far = 1000;
            camera.updateProjectionMatrix();

            // Set the size of the renderer
            const width = 900;
            const height = 600;
            renderer.setSize(width, height);
            labelRenderer.setSize(width, height);

            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
                mountRef.current.appendChild(labelRenderer.domElement);
            }

            // Create cube parts
            const cubeGroup = new THREE.Group();
            const size = 0.5;
            const gap = 0.05;
            const cubeParts: THREE.Mesh[] = [];

            const group1 = new THREE.Group();

            const positionObjectsInCircle = (objects: THREE.Object3D[], radius: number) => {
                const numberOfObjects = objects.length;
                objects.forEach((obj, index) => {
                    const angle = (index / numberOfObjects) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    obj.position.set(x, ground.position.y, z);
                });
            };

            /*

            const loader = new FBXLoader();
            loader.setPath('/3d-objects/');
            loader.load('FBX.fbx', (fbx) => {
                fbx.position.set(1, 0, 20);
                fbx.scale.set(0.005, 0.005, 0.005);
            // Add the loaded FBX model to the scene
            scene.add(fbx);
            console.log('FBX Model Loaded:', fbx);

            // Optionally animate the model (FBX models often come with animations)
            fbx.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                }
            });
            });
            */

            const mtlLoader = new MTLLoader();
            mtlLoader.setPath('/3d-objects/Buildingv3/');  // Ustawienie ścieżki do folderu z plikami OBJ i MTL
            mtlLoader.load('MODEL - (DER.MODEL CALOSC)_(3).mtl', (materials) => {
                materials.preload();  // Preload materiałów
            
                // Następnie załaduj plik OBJ z wczytanymi materiałami
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);  // Przypisz materiały z MTL
                objLoader.setPath('/3d-objects/Buildingv3/');  // Ustaw ścieżkę do folderu z plikiem OBJ
                objLoader.load('MODEL - (DER.MODEL CALOSC)_(3).obj', (object) => {
                    // Kiedy model zostanie załadowany, ustaw jego pozycję i skalę, a następnie dodaj do sceny
                    object.position.set(-4.5, 0, 13);
                    object.scale.set(100, 100, 100);
                    scene.add(object);
                    setLoadingProgress(100);
                    setIsLoading(false);
                    
                    /*
                    const mesh = scene.getObjectByName('Building3MultiObject')

                    console.log(mesh)
                    console.log(mesh instanceof THREE.Mesh)
                    if (mesh instanceof THREE.Mesh) {
                        // Clone the material to avoid affecting other objects using the same material
                        mesh.material = Array.isArray(mesh.material)
                            ? mesh.material.map((mat) => mat.clone())  // Clone each material if it's an array
                            : mesh.material.clone();                   // Clone the single material
                    
                        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                    
                        materials.forEach((material, index) => {
                            // Check if the material has a color property
                            if ((material as THREE.MeshBasicMaterial).color) {
                                (material as THREE.MeshBasicMaterial).color.set(0xff0000);  // Set color to red
                            } else {
                                console.error(`Material ${index} does not have a color property.`);
                            }
                        });
                    } else {
                        console.error('The object is not a mesh or was not found.');
                    }
                        */
                }, 
                (xhr) => {
                    const progress = (xhr.loaded / xhr.total) * 100;
                    setLoadingProgress(Math.round(progress)); // Procent ładowania
                }, 
                (error) => {
                    console.error('An error happened while loading the OBJ', error);
                    setIsLoading(false);
                });
            });

            // Load textures with error handling
            const textureLoader = new THREE.TextureLoader();
            const loadTexture = (url: string) => {
                return new Promise<THREE.Texture>((resolve) => {
                    textureLoader.load(
                        url,
                        (texture) => resolve(texture),
                        undefined,
                        () => {
                            console.error(`Failed to load texture: ${url}`);
                            resolve(new THREE.Texture()); // Return a default texture
                        }
                    );
                });
            };

            Promise.all([
                loadTexture('/wood-texture.jpg'),
                loadTexture('/metal-texture.jpg')
            ]).then(([woodTexture, metalTexture]) => {
                for (let x = 0; x < 2; x++) {
                    for (let y = 0; y < 2; y++) {
                        for (let z = 0; z < 2; z++) {
                            const geometry = new THREE.BoxGeometry(size, size, size);
                            const material = new THREE.MeshStandardMaterial({ 
                                map: x % 2 === 0 ? woodTexture : metalTexture,
                                metalness: x % 2 === 0 ? 0.2 : 0.8,
                                roughness: x % 2 === 0 ? 0.8 : 0.2,
                            });
                            const cubePart = new THREE.Mesh(geometry, material);
                            cubePart.position.set(
                                x * (size + gap) - (size + gap) / 2,
                                y * (size + gap) - (size + gap) / 2,
                                z * (size + gap) - (size + gap) / 2
                            );
                            cubePart.userData = { 
                                partId: `${x}-${y}-${z}`,
                                originalMetalness: material.metalness,
                                originalRoughness: material.roughness
                            };
                            cubeGroup.add(cubePart);
                            cubeParts.push(cubePart);
                        }
                    }
                }
                //scene.add(cubeGroup);
            });

            // Improved lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xff9000, 1, 10);
            pointLight.position.set(-2, 1, 2);
            scene.add(pointLight);

            // Create an enhanced ground
            loadTexture('/grass-texture.jpg').then((groundTexture) => {
                groundTexture.wrapS = THREE.RepeatWrapping;
                groundTexture.wrapT = THREE.RepeatWrapping;
                groundTexture.repeat.set(10, 10);

                const planeGeometry = new THREE.PlaneGeometry(60, 30);
                const planeMaterial = new THREE.MeshStandardMaterial({ 
                    map: groundTexture,
                    roughness: 0.8,
                    metalness: 0.2
                });
                const plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.rotation.x = - Math.PI / 2;
                plane.position.y = -0.5;
                plane.position.x = 2;
                plane.receiveShadow = true;
                //scene.add(plane);
            });           

            // Create a simple colored background instead of skybox
            scene.background = new THREE.Color(0x87CEEB); // Sky blue color

            // Set the camera position
            camera.position.set(0, 0, 15);
            camera.lookAt(0, ground.position.y, 0);
            //camera.lookAt(0, ground.position.y, 0);
            //camera.fov = 90; 
            controls.update();

            // Update camera aspect ratio
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // Raycaster for hover detection
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            const isMaterialWithColor = (material: THREE.Material): material is THREE.Material & { color: THREE.Color } => {
                return 'color' in material && material.color instanceof THREE.Color;
            };
            

            let hoveredPart: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null = null;

            const onMouseMove = (event: MouseEvent) => {
                const rect = mountRef.current!.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);

                const buildingNames = ['Building1MultiObject', 'Building2MultiObject', 'Building3MultiObject', 'Building4MultiObject', 'Building5MultiObject'];
                const buildingObjects = buildingNames.map(name => scene.getObjectByName(name)).filter(Boolean) as THREE.Mesh[];

                const intersects = raycaster.intersectObjects(buildingObjects);

                if (hoveredPart) {
                    resetHoveredPart(hoveredPart);
                    hoveredPart = null;
                }

                if (intersects.length > 0) {
                    const intersectedObject = intersects[0].object as THREE.Mesh;
                    if (intersectedObject instanceof THREE.Mesh) {
                        setHoveredPart(intersectedObject);
                        const buildingName = intersectedObject.name;
                        showPopup(event, rect, buildingName);
                    }
                } else {
                    setPopup(prev => ({ ...prev, visible: false }));
                }
            };

            const onMouseClick = (event: MouseEvent) => {
                const rect = mountRef.current!.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
              
                raycaster.setFromCamera(mouse, camera);
              
                const buildingNames = ['Building1MultiObject', 'Building2MultiObject', 'Building3MultiObject', 'Building4MultiObject', 'Building5MultiObject'];
                const buildingObjects = buildingNames.map(name => scene.getObjectByName(name)).filter(Boolean) as THREE.Mesh[];
              
                const intersects = raycaster.intersectObjects(buildingObjects);
              
                if (intersects.length > 0) {
                  const intersectedObject = intersects[0].object as THREE.Mesh;
                  if (intersectedObject instanceof THREE.Mesh) {
                    const buildingName = intersectedObject.name;
                    const apartmentData = apartments?.find(apt => apt.ID === buildingIdMap[buildingName]);
                    openImageModal(buildingIdMap[buildingName]);
                    showPopup(event, rect, buildingName);
                  }
                } else {
                  setPopup(prev => ({ ...prev, visible: false }));
                }
              };

            window.addEventListener('click', onMouseClick);

            const resetHoveredPart = (part: THREE.Mesh) => {
                const materials = Array.isArray(part.material) ? part.material : [part.material];

                materials.forEach((material) => {
                    if (isMaterialWithColor(material) && part.userData.originalColor !== undefined) {
                        material.color.set(part.userData.originalColor);
                    }
                    if (part.userData.originalOpacity !== undefined) {
                        material.opacity = part.userData.originalOpacity;
                        material.transparent = part.userData.originalOpacity < 1;
                    }
                });

            };

            const setHoveredPart = (part: THREE.Mesh) => {
                const materials = Array.isArray(part.material) ? part.material : [part.material];
                const hoverColor = getHoverColor(part.name);

                materials.forEach((material, index) => {
                    const clonedMaterial = material.clone();
                    
                    if (part.userData.originalMaterials === undefined) {
                        part.userData.originalMaterials = materials;
                    }

                    if (isMaterialWithColor(clonedMaterial)) {
                        if (part.userData.originalColor === undefined) {
                            part.userData.originalColor = clonedMaterial.color.getHex();
                        }
                        clonedMaterial.color.setHex(hoverColor);
                    }

                    if (part.userData.originalOpacity === undefined) {
                        part.userData.originalOpacity = clonedMaterial.opacity;
                    }

                    if (Array.isArray(part.material)) {
                        part.material[index] = clonedMaterial;
                    } else {
                        part.material = clonedMaterial;
                    }
                });

                hoveredPart = part;
            };

            const setHighlightedPart = (part: THREE.Mesh) => {
                const materials = Array.isArray(part.material) ? part.material : [part.material];
                const hoverColor = getHoverColor(part.name);

                materials.forEach((material, index) => {
                    const clonedMaterial = material.clone();
                    
                    if (part.userData.originalMaterials === undefined) {
                        part.userData.originalMaterials = materials;
                    }

                    if (isMaterialWithColor(clonedMaterial)) {
                        if (part.userData.originalColor === undefined) {
                            part.userData.originalColor = clonedMaterial.color.getHex();
                        }
                        clonedMaterial.color.setHex(hoverColor);
                    }

                    if (part.userData.originalOpacity === undefined) {
                        part.userData.originalOpacity = clonedMaterial.opacity;
                    }

                    if (Array.isArray(part.material)) {
                        part.material[index] = clonedMaterial;
                    } else {
                        part.material = clonedMaterial;
                    }
                });

                hoveredPart = part;
            };

            const updateAllBuildingColors = () => {
                const buildingNames = ['Building1MultiObject', 'Building2MultiObject', 'Building3MultiObject', 'Building4MultiObject', 'Building5MultiObject'];
                buildingNames.forEach(name => {
                    const building = scene.getObjectByName(name) as THREE.Mesh;
                    if (building && building instanceof THREE.Mesh) {
                        setHighlightedPart(building);
                    }
                });
            };

            // Call updateAllBuildingColors whenever activeView changes
            updateAllBuildingColors();
            
            // Function to show popup
            const showPopup = (event: MouseEvent, rect: DOMRect, buildingName: string) => {
                const popupWidth = 150;
                const popupHeight = 30;
                const margin = 10;
            
                let popupX = event.clientX - rect.left - popupWidth - margin;
                let popupY = event.clientY - rect.top;
            
                if (popupX < 0) popupX = margin;
                if (popupX + popupWidth > width) popupX = width - popupWidth - margin;
                if (popupY + popupHeight > height) popupY = height - popupHeight - margin;
            
                const state = getApartmentState(buildingName);
                setPopup({
                    visible: true,
                    content: `${buildingName} - Status: ${state.toUpperCase()}`,
                    position: {
                        x: popupX,
                        y: popupY
                    }
                });
            };
            
            // Add event listener for mouse movement
            window.addEventListener('mousemove', onMouseMove);

            

            
            

            // Handle window resize
            const handleResize = () => {
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
                labelRenderer.setSize(width, height);
            };
            window.addEventListener('resize', handleResize);

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();

                renderer.render(scene, camera);
                labelRenderer.render(scene, camera);
            };
            animate();

            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', onMouseMove);
                if (mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement);
                    mountRef.current.removeChild(labelRenderer.domElement);
                }
            };
        }
    }, [mountRef, apartments, apartmentsLoading]);

    return (
        <div style={{
            position: 'relative',
            width: '900px',
            height: '600px',
            zIndex: 0,
            pointerEvents: 'auto',
          }}>

            <div className="absolute top-4 left-4 z-10 flex gap-2 bg-gray-200 bg-opacity-90 rounded-md"
                style={{backgroundColor: 'rgba(240, 240, 240, 0.5)'}}>
                <button
                    onClick={() => {
                        if (activeView == 'available'){
                            setActiveView('all')
                        }
                        else {
                            setActiveView('available')
                        }
                            
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors
                        ${activeView === 'available' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Available
                </button>
                <button
                    onClick={() => {
                        if (activeView == 'reserved'){
                            setActiveView('all')
                        }
                        else {
                            setActiveView('reserved')
                        }
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors
                        ${activeView === 'reserved' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Reserved
                </button>
                <button
                    onClick={() => {
                        if (activeView == 'sold'){
                            setActiveView('all')
                        }
                        else {
                            setActiveView('sold')
                        }
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors
                        ${activeView === 'sold' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    Sold
                </button>
            </div>

            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    fontSize: '24px',
                    zIndex: 1000,
                }}>
                    <div>Loading 3D Model...</div>
                    <div style={{ marginTop: '20px', fontSize: '18px' }}>
                        {loadingProgress}%
                    </div>
                    <div style={{
                        width: '200px',
                        height: '20px',
                        background: '#333',
                        marginTop: '10px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${loadingProgress}%`,
                            height: '100%',
                            background: '#4CAF50',
                            transition: 'width 0.3s ease-in-out',
                        }} />
                    </div>
                </div>
            )}
            {isImageModalVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 100,
                    }}
                >
                    <div style={{ maxWidth: '80%', maxHeight: '80%', position: 'relative' }}>
                        <img
                            src={clickedApartmentImage}
                            alt="Apartment"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                cursor: 'pointer',
                                color: 'white',
                                fontSize: '24px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '5px 10px',
                                borderRadius: '4px', 
                                zIndex: 101,
                            }}
                            onClick={closeImageModal}
                        >
                            ×
                        </div>
                    </div>
                </div>
            )}

            {popup.visible && (
                <div style={{
                    color: 'black',
                    position: 'absolute',
                    left: popup.position.x,
                    top: popup.position.y,
                    background: 'white',
                    padding: '5px',
                    borderRadius: '3px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                }}>
                    {popup.content}
                </div>
            )}
        </div>
    );
};

export default View3D;
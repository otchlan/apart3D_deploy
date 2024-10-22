import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';




const View3DSmall: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const labelRendererRef = useRef<CSS2DRenderer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [popup, setPopup] = useState<{visible: boolean, content: string, position: {x: number, y: number}}>({
        visible: false,
        content: '',
        position: {x: 0, y: 0}
    });

    useEffect(() => {
        if (mountRef.current) {
            // Set up the scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            const labelRenderer = new CSS2DRenderer();
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minPolarAngle = Math.PI / 4;
            controls.maxPolarAngle = Math.PI / 2.2;
            controls.enableZoom = false;

            // Set the size of the renderer
            rendererRef.current = renderer;
            labelRendererRef.current = labelRenderer;

            // Get initial container dimensions
            const container = mountRef.current;
            const width = container.clientWidth;
            const height = container.clientHeight;

            // Set initial size
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
            mtlLoader.setPath('/3d-objects/');  // Ustawienie ścieżki do folderu z plikami OBJ i MTL
            mtlLoader.load('OBJMultiv2.mtl', (materials) => {
                materials.preload();  // Preload materiałów
            
                // Następnie załaduj plik OBJ z wczytanymi materiałami
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);  // Przypisz materiały z MTL
                objLoader.setPath('/3d-objects/');  // Ustaw ścieżkę do folderu z plikiem OBJ
                objLoader.load('OBJMultiv2.obj', (object) => {
                    // Kiedy model zostanie załadowany, ustaw jego pozycję i skalę, a następnie dodaj do sceny
                    object.position.set(-4.5, 0, 13);
                    object.scale.set(1, 1, 1);
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

            /*
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
                scene.add(plane);
            });*/

            // Create a simple colored background instead of skybox
            scene.background = new THREE.Color(0xffffff); // Sky blue color

            // Set the camera position
            camera.position.set(0, 0, 15);
            camera.lookAt(0, 0, 0);
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

                materials.forEach((material, index) => {
                    const clonedMaterial = material.clone();
                    
                    if (part.userData.originalMaterials === undefined) {
                        part.userData.originalMaterials = materials;
                    }

                    if (isMaterialWithColor(clonedMaterial)) {
                        if (part.userData.originalColor === undefined) {
                            part.userData.originalColor = clonedMaterial.color.getHex();
                        }
                        clonedMaterial.color.set(0xff0000);
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
            
            // Function to show popup
            const showPopup = (event: MouseEvent, rect: DOMRect, buildingName: string) => {
                const popupWidth = 100;
                const popupHeight = 30;
                const margin = 10;
            
                let popupX = event.clientX - rect.left - popupWidth - margin;
                let popupY = event.clientY - rect.top;
            
                if (popupX < 0) popupX = margin;
                if (popupX + popupWidth > width) popupX = width - popupWidth - margin;
                if (popupY + popupHeight > height) popupY = height - popupHeight - margin;
            
                setPopup({
                    visible: true,
                    content: `Object: ${buildingName}`,
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
                if (mountRef.current && rendererRef.current && labelRendererRef.current) {
                    const newWidth = mountRef.current.clientWidth;
                    const newHeight = mountRef.current.clientHeight;
                    
                    camera.aspect = newWidth / newHeight;
                    camera.updateProjectionMatrix();
                    
                    rendererRef.current.setSize(newWidth, newHeight);
                    labelRendererRef.current.setSize(newWidth, newHeight);
                }
            };

            // Create ResizeObserver to handle container size changes
            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });

            if (container) {
                resizeObserver.observe(container);
            }

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
                labelRenderer.render(scene, camera);
            };
            animate();

            // Cleanup
            return () => {
                resizeObserver.disconnect();
                window.removeEventListener('mousemove', onMouseMove);
                if (mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement);
                    mountRef.current.removeChild(labelRenderer.domElement);
                }
            };
        }
    }, []);

    return (
        <div style={{ 
            position: 'relative',
            width: '100%',    // Takes full width of parent
            height: '100%',   // Takes full height of parent
            minHeight: '300px' // Ensures a minimum height
        }}>
            <div ref={mountRef} style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            }} />
            {/* Loading and popup overlays remain the same */}
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
            {popup.visible && (
                <div style={{
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

export default View3DSmall;
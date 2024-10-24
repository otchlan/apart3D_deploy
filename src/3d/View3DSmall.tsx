import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const View3DSmall: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const labelRendererRef = useRef<CSS2DRenderer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showMotionIcon, setShowMotionIcon] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [popup, setPopup] = useState<{visible: boolean, content: string, position: {x: number, y: number}}>({
        visible: false,
        content: '',
        position: {x: 0, y: 0}
    });

    // Define the cleanupCanvas function
    const cleanupCanvas = () => {
        if (mountRef.current) {
            if (rendererRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }
            if (labelRendererRef.current) {
                mountRef.current.removeChild(labelRendererRef.current.domElement);
            }
        }
    };

    useEffect(() => {
        if (mountRef.current) {
            // Set up the scene
            const scene = new THREE.Scene();
            scene.background = null;
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                premultipliedAlpha: false
            });
            const labelRenderer = new CSS2DRenderer();
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minPolarAngle = Math.PI / 4;
            controls.maxPolarAngle = Math.PI / 2.2;
            controls.enableZoom = false;

            rendererRef.current = renderer;
            labelRendererRef.current = labelRenderer;

            const container = mountRef.current;
            const width = container.clientWidth;
            const height = container.clientHeight;

            renderer.setSize(width, height);
            labelRenderer.setSize(width, height);

            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
                mountRef.current.appendChild(labelRenderer.domElement);
            }

            

            // Track loading progress for both objects
            let objectsLoaded = 0;
            const totalObjects = 2;
            const updateProgress = (individualProgress: number) => {
                const baseProgress = (objectsLoaded * 100) / totalObjects;
                const currentProgress = individualProgress / totalObjects;
                setLoadingProgress(Math.round(baseProgress + currentProgress));
            };

            // Load first object (background)
            const loadFirstObject = () => {
                const mtlLoader = new MTLLoader();
                mtlLoader.setPath('/3d-objects/Building/');
                mtlLoader.load('OBJMultiv2.mtl', (materials) => {
                    materials.preload();
                
                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath('/3d-objects/Building/');
                    objLoader.load('OBJMultiv2.obj', (object) => {
                        object.position.set(-4.5, 0, 13);
                        object.scale.set(1.5, 1.5, 1.5);
                        scene.add(object);
                        objectsLoaded++;
                        updateProgress(100);
                        loadSecondObject(); // Load second object after first is complete
                    }, 
                    (xhr) => {
                        const progress = (xhr.loaded / xhr.total) * 100;
                        updateProgress(progress);
                    }, 
                    (error) => {
                        console.error('Error loading first object:', error);
                        objectsLoaded++;
                        loadSecondObject(); // Try loading second object even if first fails
                    });
                });
            };

            // Load second object (foreground)
            const loadSecondObject = () => {
                const mtlLoader = new MTLLoader();
                mtlLoader.setPath('/3d-objects/LuminarySentinel/');
                mtlLoader.load('model.mtl', (materials) => {
                    materials.preload();
                
                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath('/3d-objects/LuminarySentinel/');
                    objLoader.load('Luminary_Sentinel.obj', (object) => {
                        // Position the second object in front of the first one
                        object.position.set(-4.5, 0, 8); // Reduced Z position to move it forward
                        object.scale.set(1.5, 1.5, 1.5);
                        scene.add(object);
                        objectsLoaded++;
                        updateProgress(100);
                        if (objectsLoaded === totalObjects) {
                            setIsLoading(false);
                        }
                    }, 
                    (xhr) => {
                        const progress = (xhr.loaded / xhr.total) * 100;
                        updateProgress(progress);
                    }, 
                    (error) => {
                        console.error('Error loading second object:', error);
                        objectsLoaded++;
                        if (objectsLoaded === totalObjects) {
                            setIsLoading(false);
                        }
                    });
                });
            };

            // Start loading objects
            loadFirstObject();

            // Lighting setup
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xff9000, 1, 10);
            pointLight.position.set(-2, 1, 2);
            scene.add(pointLight);

            // Scene settings
            renderer.setClearColor(0x000000, 0);
            scene.background = null;

            // Camera setup
            camera.position.set(0, 0, 15);
            camera.lookAt(0, 0, 0);
            controls.update();

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // Raycaster setup
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            const isMaterialWithColor = (material: THREE.Material): material is THREE.Material & { color: THREE.Color } => {
                return 'color' in material && material.color instanceof THREE.Color;
            };

            let hoveredPart: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null = null;

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

            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });

            if (container) {
                resizeObserver.observe(container);
            }

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
                labelRenderer.render(scene, camera);
            };
            animate();

            // Cleanup function
            return () => {
                resizeObserver.disconnect();
                window.removeEventListener('mousemove', onMouseMove);
                cleanupCanvas();
            };
        }
    }, []);

    return (
        <div style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '400px',
            background: 'transparent',
        }}>
            <div ref={mountRef} style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent',
            }} />
            {showMotionIcon && (
                <div 
                    onClick={() => setShowMotionIcon(false)}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        animation: 'blink 1s infinite',
                        zIndex: 1000,
                    }}
                >
                    <img 
                        src="/3d-motion-w.png" 
                        alt="3D Motion" 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            )}
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
                    <div>Loading 3D Models...</div>
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
            <style jsx>{`
                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default View3DSmall;
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const View3D: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
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

            // Set the size of the renderer
            const width = 800;
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
            const gap = 0;
            const cubeParts: THREE.Mesh[] = [];
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    for (let z = 0; z < 2; z++) {
                        const geometry = new THREE.BoxGeometry(size, size, size);
                        const material = new THREE.MeshPhongMaterial({ 
                            color: 0xffffff,
                            specular: 0x050505,
                            shininess: 100
                        });
                        const cubePart = new THREE.Mesh(geometry, material);
                        cubePart.position.set(
                            x * (size + gap) - (size + gap) / 2,
                            y * (size + gap) - (size + gap) / 2,
                            z * (size + gap) - (size + gap) / 2
                        );
                        cubePart.userData = { 
                            partId: `${x}-${y}-${z}`,
                            originalColor: material.color.getHex()
                        };
                        cubeGroup.add(cubePart);
                        cubeParts.push(cubePart);
                    }
                }
            }
            scene.add(cubeGroup);

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Create a green flat surface
            const planeGeometry = new THREE.PlaneGeometry(10, 10);
            const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = - Math.PI / 2;
            plane.position.y = -0.5; // Move the plane down a bit
            scene.add(plane);

            // Create a sky background
            const skyColor = new THREE.Color(0x87CEEB);
            scene.background = skyColor;

            // Set the camera position
            camera.position.set(3, 3, 3);
            camera.lookAt(cubeGroup.position);
            controls.update();

            // Update camera aspect ratio
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // Raycaster for hover detection
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            let hoveredPart: THREE.Mesh | null = null;

            // Handle mouse move for hover effect
            const onMouseMove = (event: MouseEvent) => {
                const rect = mountRef.current!.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(cubeParts);

                // Reset previously hovered part
                if (hoveredPart) {
                    (hoveredPart.material as THREE.MeshPhongMaterial).color.setHex(hoveredPart.userData.originalColor);
                    hoveredPart.scale.set(1, 1, 1);
                }

                if (intersects.length > 0) {
                    const intersectedObject = intersects[0].object as THREE.Mesh;
                    const partId = intersectedObject.userData.partId;
                    
                    // Highlight the hovered part
                    (intersectedObject.material as THREE.MeshPhongMaterial).color.setHex(0xffff00); // Yellow highlight
                    intersectedObject.scale.set(1.1, 1.1, 1.1); // Slightly enlarge the part
                    hoveredPart = intersectedObject;

                    // Calculate popup position
                    const popupWidth = 100; // Approximate width of the popup
                    const popupHeight = 30; // Approximate height of the popup
                    const margin = 10; // Margin from the cursor
                    
                    let popupX = event.clientX - rect.left - popupWidth - margin;
                    let popupY = event.clientY - rect.top;

                    // Ensure the popup stays within the component bounds
                    if (popupX < 0) popupX = margin;
                    if (popupX + popupWidth > width) popupX = width - popupWidth - margin;
                    if (popupY + popupHeight > height) popupY = height - popupHeight - margin;

                    setPopup({
                        visible: true,
                        content: `Cube Part: ${partId}`,
                        position: {
                            x: popupX,
                            y: popupY
                        }
                    });
                } else {
                    hoveredPart = null;
                    setPopup(prev => ({ ...prev, visible: false }));
                }
            };

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
    }, []);

    return (
        <div style={{ position: 'relative', width: '800px', height: '600px' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
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

export default View3D;
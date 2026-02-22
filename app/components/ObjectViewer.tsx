import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
    const obj = useLoader(OBJLoader, url);
    const meshRef = useRef<THREE.Group>(null);

    // Apply materials to the OBJ children
    useMemo(() => {
        obj.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
                const name = child.name.toLowerCase();

                // Logical mapping based on common naming conventions or simple heuristics
                if (name.includes('eye') || name.includes('mouth') || name.includes('feature')) {
                    child.material = new THREE.MeshStandardMaterial({ color: '#1A1A1A', roughness: 0.1, metalness: 0 });
                } else if (name.includes('crust') || name.includes('outline') || name.includes('edge')) {
                    child.material = new THREE.MeshStandardMaterial({ color: '#E67E22', roughness: 0.7, metalness: 0 });
                } else if (name.includes('butter') || name.includes('top')) {
                    child.material = new THREE.MeshStandardMaterial({ color: '#FFD700', roughness: 0.2, metalness: 0 });
                } else {
                    // Default to body color (Moccasin/Peach)
                    child.material = new THREE.MeshStandardMaterial({ color: '#FFE4B5', roughness: 0.5, metalness: 0 });
                }
            }
        });
    }, [obj]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.8;
        }
    });

    return <primitive object={obj} ref={meshRef} />;
}

export default function ObjectViewer({
    modelPath,
    height = '100vh',
    background = '#000'
}: {
    modelPath: string;
    height?: string;
    background?: string;
}) {
    return (
        <div style={{ width: '100%', height: height, background: background }}>
            <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage
                        environment="studio"
                        intensity={1}
                        shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}
                    >
                        <Model url={modelPath} />
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault enableZoom={false} />
            </Canvas>
        </div>
    );
}

'use client';

import { useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    OrbitControls,
} from '@react-three/drei';
import { Plane, DoubleSide, Vector3 } from 'three';
import { useTheme } from 'next-themes';

export default function Logo() {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    return (
        <Canvas
            gl={{ localClippingEnabled: true }}
            shadows
            camera={{ position: [0, 0, 20], fov: 50 }}
        >
            <group position={[0, -0.65, 0]}>
                <ClippedCapsule planeConstant={2} position={[0.5, 4, 0]} />{' '}
                {/* First Capsule */}
                <ClippedCapsule2
                    planeConstant={1.6}
                    position={[1, 8, 0]}
                />{' '}
                {/* Second Capsule */}
                <Sphere1 position={[1.5, 3.6, 0]} /> {/* First Sphere */}
                <Sphere2 position={[0, 7.5, 0]} /> {/* Second Sphere */}
                <AccumulativeShadows
                    temporal
                    frames={200}
                    color="purple"
                    colorBlend={1}
                    opacity={0.5}
                    scale={50}
                    alphaTest={0.7}
                >
                    <RandomizedLight
                        amount={8}
                        radius={20}
                        ambient={1}
                        position={[5, 3, 1]}
                        bias={0.001}
                    />
                </AccumulativeShadows>
            </group>
            <Env />
            <OrbitControls
                autoRotate
                autoRotateSpeed={3}
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
            />
        </Canvas>
    );
}

interface SphereProp {
    position: any;
}

function Sphere1({ position }: SphereProp) {
    return (
        <mesh castShadow position={position}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial metalness={0} color="#43BFB0" roughness={1} />
        </mesh>
    );
}

function Sphere2({ position }: SphereProp) {
    return (
        <mesh castShadow position={position}>
            <sphereGeometry args={[0.75, 64, 64]} />
            <meshStandardMaterial metalness={0} color="#95C973" roughness={1} />
        </mesh>
    );
}
function Env() {
    return <Environment preset={'sunset'} background={false} blur={0.65} />;
}

interface ClippedCapsuleProp {
    planeConstant: any;
    position: any;
}

function ClippedCapsule({ planeConstant, position }: ClippedCapsuleProp) {
    const materialRef: any = useRef();
    const clippingPlane = useMemo(
        () => new Plane(new Vector3(-2, -1, 0).normalize(), planeConstant),
        [planeConstant],
    );

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.clippingPlanes = [clippingPlane];
        }
    }, [clippingPlane]);

    return (
        <mesh castShadow position={position} scale={[-1, -1, 1]}>
            <capsuleGeometry args={[1.3, 4.5, 20, 20]} />
            <meshStandardMaterial
                color="#233B70"
                metalness={0}
                ref={materialRef}
                side={DoubleSide}
            />
        </mesh>
    );
}

function ClippedCapsule2({ planeConstant, position }: ClippedCapsuleProp) {
    const materialRef: any = useRef();
    const clippingPlane = useMemo(
        () => new Plane(new Vector3(4, -2, 0).normalize(), planeConstant),
        [planeConstant],
    );

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.clippingPlanes = [clippingPlane];
        }
    }, [clippingPlane]);

    return (
        <mesh castShadow position={position} scale={[-1, -1, 1]}>
            <capsuleGeometry args={[1, 4.5, 20, 20]} />
            <meshStandardMaterial
                ref={materialRef}
                color="#9CDDD0"
                side={DoubleSide}
            />
        </mesh>
    );
}

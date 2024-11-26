'use client';

import { useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    OrbitControls,
    PivotControls,
} from '@react-three/drei';
import { Plane, DoubleSide, Vector3, CylinderGeometry } from 'three';
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
                <ClippedCapsule planeConstant={2} position={[0.5, 4, 2]} />{' '}
                <ClippedCapsule2 planeConstant={1.6} position={[1, 8, 2]} />{' '}
                <Sphere1 position={[1.5, 3.6, 2]} />{' '}
                <Sphere2 position={[0, 7.5, 2]} />
                <SphereRotatingLogo />{' '}
                <AccumulativeShadows
                    temporal
                    frames={200}
                    color="purple"
                    colorBlend={0.1}
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

function SphereRotatingLogo() {
    const pos = new Vector3(0, 4, -3);
    return (
        <>
            <HalfCircle1 position={pos} />
            <HalfCircle2 position={pos} />
        </>
    );
}

interface HalfCircleProps {
    position: Vector3;
}

function HalfCircle1({ position }: HalfCircleProps) {
    return (
        <>
            <Torus1 color="#F3D03E" position={position} />
            <Cylinder1 color="#F3D03E" position={position} />
            <Plane1 color="#F3D03E" position={position} />
        </>
    );
}

function HalfCircle2({ position }: HalfCircleProps) {
    return (
        <>
            <Torus2 color="#00AEC7" position={position} />
            <Cylinder2 color="#002855" position={position} />
            <Plane2 color="#00AEC7" position={position} />
        </>
    );
}

interface TorusProps {
    position: Vector3;
    color?: string;
}

function Torus1({ color, position }: TorusProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x += 1.267;
    return (
        <mesh castShadow position={pos} scale={[-1, -1, -1]}>
            <torusGeometry args={[3, 0.501, 100, 100, 1.55]} />
            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}

function Torus2({ color, position }: TorusProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x -= 1.263;
    return (
        <mesh castShadow position={pos} scale={[1, 1, 1]}>
            <torusGeometry args={[3, 0.501, 100, 100, 1.55]} />
            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}

interface PlaneProps {
    position: Vector3;
    color?: string;
}

function Plane1({ position, color }: PlaneProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x -= 1.725;
    return (
        <mesh position={pos} scale={[1, -1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.501, 100]} />
            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}
function Plane2({ position, color }: PlaneProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x += 1.725;

    return (
        <mesh position={pos} scale={[1, -1, 1]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.501, 100]} />
            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}

interface CylinderProps {
    position: Vector3;
    color?: string;
}

function Cylinder1({ color, position }: CylinderProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x += 1.68;
    pos.y -= 3;
    return (
        <mesh
            castShadow
            position={pos}
            scale={[1, -1, 1]}
            rotation={[0, 0, Math.PI / 2]}
        >
            {/* <boxGeometry args={[2, 2, 2, 100, 1]} /> */}
            <cylinderGeometry args={[0.501, 0.501, 0.98, 100, 1, false]} />
            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}
function Cylinder2({ color, position }: CylinderProps) {
    const materialRef: any = useRef();
    const pos: Vector3 = position ? position.clone() : new Vector3(0, 0, 0);
    pos.x -= 1.68;
    pos.y += 3;
    return (
        <mesh
            castShadow
            position={pos}
            scale={[1, -1, 1]}
            rotation={[0, 0, Math.PI / 2]}
        >
            <cylinderGeometry args={[0.501, 0.501, 0.98, 100, 1, false]} />
            {/* <boxGeometry args={[2.05, 2.05, 2.05, 100, 1]} /> */}

            <meshStandardMaterial ref={materialRef} color={color || '#000'} />
        </mesh>
    );
}

'use client' 

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Grid, SpotLight } from '@react-three/drei';
import { Color, ColorRepresentation } from 'three';

const CameraControls = () => {
  const camera = useRef<any>();
  const plane = useRef<any>();
  const light = useRef<any>();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (plane.current) {
      const rotationX = Math.min(Math.max(mousePosition.y * 0.5 + 0.6, 0), 1) * Math.PI * 0.2;
      const rotationY = Math.min(Math.max(mousePosition.x * 0.5 + 0.5, 0), 1) * Math.PI * 0.2;
      plane.current.rotation.x = rotationX;
      plane.current.rotation.y = rotationY;
    }
  });

  const gradientColorRepresentation = (start: string, end: string): ColorRepresentation => {

const color = new Color(start);
return color.lerpColors(new Color(start), new Color(end), 1);
  }

  return (
    <>
      <PerspectiveCamera ref={camera} position={[0, 0, 5]} />
      <Grid ref={plane} sectionThickness={2} infiniteGrid fadeDistance={100} fadeStrength={10} />
    </>
  );
};

const IndexPage = () => {
  return (
    <>
    <div className='z-10 absolute top-0'>
      <div className='h-screen w-screen overflow-hidden'>
        <div className="flex w-full justify-center h-full items-center">
        {/* 3x3 grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500 h-32 w-32">
            Join the Discord!</div>
            <div className="bg-green-500 h-32 w-32">
            How to Play
            </div>
            <div className="bg-blue-500 h-32 w-32">
            Tools
            </div>
            <div className="bg-yellow-500 h-32 w-32"></div>
            <div className="bg-pink-500 h-32 w-32"></div>
            <div className="bg-purple-500 h-32 w-32"></div>
            <div className="bg-indigo-500 h-32 w-32"></div>
            <div className="bg-gray-500 h-32 w-32"></div>
            <div className="bg-black h-32 w-32"></div>
          </div>
        
        </div>
      </div>
    </div>
    <Canvas style={{ height: '100vh', background: '#000000' }}>
      <CameraControls />

    </Canvas>
    </>
  );
};

export default IndexPage;
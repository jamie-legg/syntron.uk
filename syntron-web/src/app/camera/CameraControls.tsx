"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Grid, Text3D } from "@react-three/drei";
import { Color, ColorRepresentation } from "three";

export const CameraControls = () => {
  const camera = useRef<any>();
  const plane = useRef<any>();

  const light = useRef<any>();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (plane.current) {
      const rotationX =
        Math.min(Math.max(mousePosition.y * 0.5 + 0.6, 0), 1) * Math.PI * 0.2;
      const rotationY =
        Math.min(Math.max(mousePosition.x * 0.5), 0.5) * Math.PI * 0.2;
      plane.current.rotation.x = rotationX;

      plane.current.rotation.y = rotationY;

    }
  });

  const gradientColorRepresentation = (
    start: string,
    end: string
  ): ColorRepresentation => {
    const color = new Color(start);
    return color.lerpColors(new Color(start), new Color(end), 1);
  };

  return (
    <>
      <PerspectiveCamera ref={camera} position={[0, 0, 5]} />

      <Grid
        ref={plane}
        sectionThickness={2}
        infiniteGrid
        fadeDistance={100}
        fadeStrength={10}
      />
    </>
  );
};

"use client";;
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const HowToPlayPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-around m-2">
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Game Modes
            </div>
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Public Games
            </div>
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Pickup
            </div>
          </div>
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default HowToPlayPage;

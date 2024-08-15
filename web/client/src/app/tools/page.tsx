"use client";;
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const ToolsPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-between m-2">
            <div className="w-96 border-sky-500 border-y">1</div>
            <div className="w-96 border-sky-500 border-y">
  
  2</div>
            <div className="w-96 border-sky-500 border-y">3</div>
          </div>
          <div className="flex w-full">
            <div className="border-2 border-sky-500 rounded-lg w-full">4</div>
            <div className="border-2 border-sky-500 rounded-lg w-full">5</div>
          </div>
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default ToolsPage;

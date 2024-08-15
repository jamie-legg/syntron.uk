"use client";;
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const DownloadPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-around m-2">
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Direct Download
            </div>
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Steam
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

export default DownloadPage;

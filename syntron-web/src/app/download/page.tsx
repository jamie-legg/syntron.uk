"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import { Card } from "@/app/components/Card";
import { HomeLink } from "@/app/components/HomeLink";
import Navigation from "@/app/components/Navigation";

const DownloadPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-between m-2">
            <div className="w-96 border-sky-500 border-y">Steam</div>
            <div className="w-96 border-sky-500 border-y">
  
  Direct Download</div>
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

export default DownloadPage;

"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { Text3D } from "@react-three/drei";
import { Inter } from "next/font/google";
import { CameraControls } from "@/app/camera/CameraControls";
import { Card } from "@/app/components/Card";
import { HomeLink } from "@/app/components/HomeLink";

const ImprovePage: React.FC = () => {
  return (
    <>
      <div className="z-10 absolute top-0">
        <div className="ml-2 mt-2">
          <HomeLink page={"improve your game"} />
        </div>
        <div className="h-screen w-screen overflow-hidden">
          <div className="flex w-full justify-center h-full items-center">
            <Card>
              <div className="flex"></div>
            </Card>
          </div>
        </div>
      </div>
      <Canvas style={{ height: "100vh", background: "#000000" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default ImprovePage;

"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const ImprovePage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex flex-col w-full justify-between my-2 mx-4">
            <ul className="space-y-8 text-2xl">
              <li>Fight for and maintain space.</li>

              <li>Prioritise space in the center of the zone.</li>

              <li>Become comfortable in a tight space.</li>

              <li>Watch your opponents. Consider their intentions.</li>

              <li>Use speed to your advantage.</li>

              <li>
                Consider the consequences of your actions; flat walls let you go
                fast, but allow for little maneuverability.
              </li>
            </ul>
          </div>
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default ImprovePage;

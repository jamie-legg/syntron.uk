"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./camera/CameraControls";
import { DashboardTile } from "./dashboard/DashboardTile";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { Text3D } from "@react-three/drei";
import { Inter } from "next/font/google";

const IndexPage: React.FC = () => {
  const tiles = [
    { color: "green", text: "How to Play" },
    { color: "blue", text: "Get Good" },
    { color: "yellow", text: "Aesthetics" },
    { color: "red", text: "Community" },
    { color: "pink", text: "Hall of Fame" },
    { color: "purple", text: "Creators" },
    { color: "indigo", text: "Tools & Resources" },
    { color: "gray", text: "Download" },
    { color: "black", text: "Get a login" },
  ];


  return (
    <>
      <div className="z-10 absolute top-0">
      <div className="ml-2 mt-2">
        <div className="bg-black bg-opacity-80 w-screen h-max flex justify-left items-center tracking-widest uppercase">
          <h1 className="text-sky-800 text-2xl font-bold">Syntron.uk |</h1>
          <h1 className="text-sky-400 text-2xl font-bold">&nbsp;Home</h1>
        </div>
      </div>
        <div className="h-screen w-screen overflow-hidden">
          <div className="flex w-full justify-center h-full items-center">
            <div className="grid grid-cols-3 gap-4">
              {tiles.map((tile) => (
                <DashboardTile key={tile.text}>{tile.text}</DashboardTile>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Canvas style={{ height: "100vh", background: "#000000" }}>


                <CameraControls />
      </Canvas>
    </>
  );
};

export default IndexPage;

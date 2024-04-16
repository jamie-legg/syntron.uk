"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./camera/CameraControls";
import { DashboardTile } from "./dashboard/DashboardTile";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { Text3D } from "@react-three/drei";
import { Inter } from "next/font/google";
import Aside from "./components/Aside";
import { NavBar } from "./components/Navbar";
import { usePathname, useRouter } from "next/navigation";

const IndexPage: React.FC = () => {
  const path = usePathname();
  const router = useRouter();
  const tiles = [
    { color: "green", text: "How to Play", link: "/guide/play" },
    { color: "blue", text: "Get Good", link: "/guide/improve" },
    { color: "yellow", text: "Aesthetics", link: "/guide/aesthetics" },
    { color: "red", text: "Community", link: "/community" },
    { color: "pink", text: "Hall of Fame", link: "/leaderboard" },
    { color: "purple", text: "Creators", link: "/creators" },
    { color: "indigo", text: "Tools & Resources", link: "/tools" },
    { color: "gray", text: "Download", link: "/download" },
    { color: "black", text: "Get a login", link: "/auth" },
  ];

  // redirect /discord to https://discord.gg/3d

  console.log('path:', path);
  console.log('router:', router);
  
  
  if (path === "/discord") {
    window.location.href = "https://discord.gg/dcpaauj";
  }

  return (
    <>
      <div className="z-10 absolute top-0">
        <div className="h-screen w-screen overflow-hidden">
          <div className="ml-2 mt-2">
          <NavBar title={'home'} />
          </div>
          <div className="flex w-full justify-center h-full items-center">
            <div className="grid grid-cols-3 gap-4">
              {tiles.map((tile) => (
                <DashboardTile href={tile.link} key={tile.text}>
                  {tile.text}
                </DashboardTile>
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

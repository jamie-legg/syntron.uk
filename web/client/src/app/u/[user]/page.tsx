"use client";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";
import { ProfileScreen } from "@/components/ProfileScreen";

const UserPage = ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full z-40">
            <ProfileScreen
              user={{
                name: params.user,
              }}
            />
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default UserPage;

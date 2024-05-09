"use client"
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/Navigation";
import { ProfileScreen } from "@/components/ProfileScreen";
import { useRouter } from "next/navigation";

const UserPage = ({ params }: {
  params: {
    user: string;
  };
}) => {
  const router = useRouter();

  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
        <ProfileScreen user={
          {
            name: params.user,
            imageUrl: "https://avatars.githubusercontent.com/u/1094227?v=4",
            email: "legggg@gmail.com",
            id: "1",
          }
        } />
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default UserPage;

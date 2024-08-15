"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";
import { ProfileScreen } from "@/components/ProfileScreen";
import { useRouter } from "next/navigation";

const UserPage = ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full mb-16 h-32 w-32 border-b-2 border-sky-500"></div>
            </div>
          ) : (
            <ProfileScreen
              user={{
                name: params.user,
              }}
            />
          )}
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default UserPage;

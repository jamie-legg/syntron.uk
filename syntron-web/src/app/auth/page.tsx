"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/Navigation";
import AuthForm from "@/components/auth/AuthForm";

const AuthPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-ful h-full">
        <AuthForm />
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default AuthPage;

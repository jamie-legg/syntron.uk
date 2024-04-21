"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import { Card } from "@/components/Card";
import { HomeLink } from "@/components/HomeLink";
import Navigation from "@/components/Navigation";
import AuthForm from "@/components/AuthForm";

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

"use client";;
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import {
  AESTHETICS_TEXT,
  AESTHETICS_WALLS_BOUNDARY_TEXT,
  AESTHETICS_WALLS_TEXT,
} from "@/app/consts";
import { Button } from "@/components/ui/button";

const AestheticsPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full overflow-y-auto">
          <Section
            title={"Introduction"}
            action={<Button>Quickstart</Button>}
            sections={[AESTHETICS_TEXT]}
          />

          <Section
            title={"Walls"}
            action={<Button>Customise Walls</Button>}
            sections={[AESTHETICS_WALLS_TEXT, AESTHETICS_WALLS_BOUNDARY_TEXT]}
          />
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default AestheticsPage;

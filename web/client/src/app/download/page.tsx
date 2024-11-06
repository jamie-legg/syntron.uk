"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const DownloadPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">
              Download Game Client
            </h1>
            <p className="text-center mb-8">
              Install and update the client through{" "}
              <a href="https://store.steampowered.com/app/1306180" className="text-sky-600 underline">
                Steam
              </a>{" "}
              or{" "}
              <a href="https://armagetronad.itch.io/armagetronad" className="text-sky-600 underline">
                itch.io
              </a>{" "}
              for the best experience.
            </p>

            <div className="space-y-6">

              {/* macOS */}
              <div>
                <h2 className="text-xl font-semibold">macOS</h2>
                <span className="text-gray-700 flex">
                <a href="https://launchpad.net/armagetronad/0.2.9/0.2.9.2.3/+download/armagetronad-0.2.9.2.3.dmg" className="text-sky-600 underline">
                  dmg
                </a>
                <p className="ml-4 text-gray-700">
                  64-bit Intel (Reported to run well on ARM machines)
                </p>
                </span>
              </div>

              {/* Windows */}
              <div>
                <h2 className="text-xl font-semibold">Windows</h2>
                <span className="text-gray-700 flex">
                <a href="https://launchpad.net/armagetronad/0.2.9/0.2.9.2.3/+download/armagetronad-0.2.9.2.3.win32.exe" className="text-sky-600 underline">
                  exe
                </a>
                <p className="ml-4 text-gray-700">
                  All Versions
                </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default DownloadPage;

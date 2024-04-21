"use client";;
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/Navigation";
import { getRanks } from "@/services/api";
import { TRanking } from "@/types/TApi";
import RankCard from "@/components/RankCard";

const GridSkeleton = () => {
  return (
    <>
      {Array.from({length:9}).map((_, index) => (
        <div className="m-2" key={index}>
          <div
            className="rounded-lg border border-sky-900 animate-pulse text-card-foreground shadow-sm w-96 max-w-md p-6 grid gap-4 relative"
            data-v0-t="card"
          >
            <div className="flex flex-col w-full">
            {Array.from({length:4}).map((_, index) => (
              <div key={index} className="h-4 w-full border border-pink-900 mt-6 rounded"></div>
            ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const LeaderboardsPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [ranks, setRanks] = React.useState<TRanking[]>([]);

  useEffect(() => {
    if (ranks.length > 0) return;
    getRanks().then((response) => {
      setRanks(response.data);
      setLoading(false);
    });
  });

  return (
    <>
      <Navigation>
        <div className="fixed inset-y-0 z-0 flex flex-col mt-16">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <ul role="list" className="grid grid-cols-3">
              {loading ? (
                <GridSkeleton />
              ) : (
                ranks.map((rank, index) => (
                  <li className="m-2" key={index}>
                    <RankCard key={index} playerRank={rank} />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </Navigation>
      <div className="z-0">
        <Canvas
          style={{ height: "100vh", width: "100vw", background: "#000014" }}
        >
          <CameraControls />
        </Canvas>
      </div>
    </>
  );
};

export default LeaderboardsPage;

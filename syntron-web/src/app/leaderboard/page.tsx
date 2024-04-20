"use client";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import { Card } from "@/app/components/Card";
import { HomeLink } from "@/app/components/HomeLink";
import Navigation from "@/app/components/Navigation";
import api, { getRanks } from "@/services/api";
import { TRanking } from "@/types/TApi";
import RankCard from "../components/RankCard";

const LeaderboardsPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [ranks, setRanks] = React.useState<TRanking[]>([]);

  useEffect(() => {
    if(ranks.length > 0) return;
    getRanks().then((response) => {
      setRanks(response.data);
      setLoading(false);
    });
  });

  return (
    <>
      <Navigation>
              <div className="fixed inset-y-0 z-0 flex flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
              <ul role="list" className="grid grid-cols-3 space-x-2 space-y-2">

            {loading ? (
              <div>Loading...</div>
              ) : (
                ranks.map((rank, index) => (
                <li key={index}>
                  <RankCard key={index} playerRank={rank} />
                </li>

                ))
              )}
              </ul>
          </div>
        </div>
      </Navigation>
      <div className="z-0">
      <Canvas style={{ height: '100vh', width: '100vw',background: "#000014" }}>
        <CameraControls />
      </Canvas>
      </div>
    </>
  );
};

export default LeaderboardsPage;

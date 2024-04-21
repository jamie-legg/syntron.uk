"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./camera/CameraControls";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import {
  NEWS_TEXT,
  SUGGESTION_TEXT,
  WELCOME_TEXT,
  NEWS_BANNER,
  WELCOME_BANNER,
} from "./consts";
import { TServerInfo, TServersMetadata } from "@/types/TApi";
import { getServers } from "@/services/api";
import { ServerCard } from "@/components/ServerCard";

const IndexPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [serversData, setServersData] = React.useState<TServerInfo[]>([]);
  const [serversMetadata, setServersMetadata] =
    React.useState<TServersMetadata>();

  React.useEffect(() => {
    if (serversData.length > 0) return;
    getServers()
      .then((response) => {
        const servers = response.data.servers as TServerInfo[];
        setServersMetadata(response.data.metadata);
        setServersData(
          servers.filter((server) => server.num_players > 0) as TServerInfo[]
        );
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  });

  const path = usePathname();
  const router = useRouter();
  const tiles = [
    { color: "gray", text: "Download", link: "/download" },
    { color: "green", text: "How to Play", link: "/guide/play" },
    { color: "blue", text: "Get Good", link: "/guide/improve" },
    { color: "yellow", text: "Aesthetics", link: "/guide/aesthetics" },
    { color: "pink", text: "Hall of Fame", link: "/leaderboard" },
    { color: "red", text: "Community", link: "/community" },
    { color: "purple", text: "Creators", link: "/creators" },
    { color: "indigo", text: "Resources", link: "/tools" },
    { color: "black", text: "Get a login", link: "/auth" },
  ];

  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-between my-2">
            <div>
              <h1 className="uppercase font-extrabold text-lg">{WELCOME_BANNER}</h1>
              <div className="w-48 border-sky-500 border-t">
              <div className="pt-2">
              
                {WELCOME_TEXT}
              </div>
                <div className="my-2 border-b border-sky-800">
                </div>
                                <div className="pb-2 border-b border-sky-800">
                {SUGGESTION_TEXT}

                </div>
              </div>
            </div>
            <div>
            <h1>
                          {NEWS_BANNER}
            </h1>
                        <div className="w-96 border-sky-500 border-y">

              {NEWS_TEXT}
            </div>
            </div>


            <div className="w-96 border-sky-500 border-y">
              {loading ? "Loading..." : error ? "Error" : ""}
              <p className="font-bold">
                {serversMetadata?.players_online} players online
              </p>
              {serversData.map((server, index) => (
                <div key={index}>
                  <ServerCard server={server} />
                </div>
              ))}
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

export default IndexPage;

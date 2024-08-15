"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "./camera/CameraControls";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "@/components/nav/Navigation";
import {
  NEWS_TEXT,
  SUGGESTION_TEXT,
  WELCOME_TEXT,
  NEWS_BANNER,
  WELCOME_BANNER,
  MARKETING_TEXT,
  LETS_GO_TEXT,
} from "./consts";
import { TServerInfo, TServersMetadata } from "@/types/TApi";
import { getServers } from "@/services/api";
import { ServerCard } from "@/components/ServerCard";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

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
  }, [serversData.length]);

  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex flex-col w-full justify-between my-2 mx-4">
            <span className="text-2xl my-7">
              Welcome back,
              <span className="border border-sky-300 border-dashed px-2 rounded-lg ml-2">
                User.
              </span>
            </span>

            <span className="text-xl font-thin my-4">
              This resource acts as a hub for the competetive side of
              Retrocycles. If you want to find out more about who we are and
              what we do, check out{" "}
              <a className="font-normal hover:underline" href="/discord">
                Discord
              </a>
              .
            </span>

            <span className="text-xl border-b border-sky-500 border-opacity-20 pb-8 my-4 ">
              The grid awaits.
            </span>
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

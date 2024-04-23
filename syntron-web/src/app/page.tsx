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
  MARKETING_TEXT,
  LETS_GO_TEXT,
} from "./consts";
import { TServerInfo, TServersMetadata } from "@/types/TApi";
import { getServers } from "@/services/api";
import { ServerCard } from "@/components/ServerCard";
import Section from "@/components/Section";

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
  }, []);

  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-between my-2">
            <Section
              title="Welcome"
              sections={[WELCOME_TEXT, MARKETING_TEXT, LETS_GO_TEXT]}
            />
            <Section title="News" sections={[NEWS_TEXT, SUGGESTION_TEXT]} />
            <Section
              title="Status"
              sections={[`${serversMetadata?.players_online} players online`]}
            >
              <div className="fixed inset-y-16 z-0 flex flex-col mt-16">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 ring-1 ring-white/5">
                  {loading ? "Loading..." : error ? "Error" : ""}
                  <p className="font-bold"></p>
                  {serversData.map((server, index) => (
                    <div key={index}>
                      <ServerCard server={server} />
                    </div>
                  ))}
                </div>
              </div>
            </Section>
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

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
import Dashboard from "@/components/Dashboard";

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
        <Dashboard />
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default IndexPage;

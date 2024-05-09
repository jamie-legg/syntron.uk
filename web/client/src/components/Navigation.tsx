"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "./Navbar";
import {
  ArrowDownTrayIcon,
  HomeIcon,
  KeyIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { DashboardTile } from "@/app/dashboard/DashboardTile";
import { SessionProvider } from "next-auth/react";

const routes = [
  {
    text: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Download",
    link: "/download",
    icon: <ArrowDownTrayIcon />,
  },
  {
    color: "green",
    text: "How to Play",
    link: "/guide/play",
    icon: <QuestionMarkCircleIcon />,
  },
  {
    color: "blue",
    text: "Get Good",
    link: "/guide/improve",
    icon: <StarIcon />,
  },
  {
    color: "slate",
    text: "Aesthetics",
    link: "/guide/aesthetics",
    icon: <PaintBrushIcon />,
  },
  {
    color: "slate",
    text: "Top 100",
    link: "/leaderboard",
    icon: <TrophyIcon />,
  },
  {
    color: "red",
    text: "Community",
    link: "/community",
    icon: <UserGroupIcon />,
  },
  {
    color: "purple",
    text: "Creators",
    link: "/creators",
    icon: <MegaphoneIcon />,
  },
  { color: "indigo", text: "Resources", link: "/tools", icon: <WrenchIcon /> },
  { color: "black", text: "Get a login", link: "/auth", icon: <KeyIcon /> },
];

export default function   Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const getRouteNameFromPath = () => {
    const title = routes.find((route) => route.link === path)?.text;
    if(!title) {
      // check if path has /u/ if so return the username
      const pathArray = path.split("/");
      if (pathArray[1] === "u") {
        return pathArray[2];
      }
      return "404";
    }
    return title;
  };

  return (
    <SessionProvider>
      <div className="z-10 fixed top-0 w-screen h-screen md:p-4 xl:p-8">
        <div className="flex justify-center items-center h-full">
          <div className="w-full rounded-lg shadow-lg h-full relative text-sky-400 border border-sky-400 border-opacity-30 backdrop-filter backdrop-blur-xl pr-5 transition-all duration-200">
            <div className="mb-16 z-50 block">
              <NavBar getTitle={() => getRouteNameFromPath()} />
            </div>
            <div className="flex w-full justify-start h-full">
              <div className="flex-col z-50 h-full w-48 overflow-y-auto bg-black/30 border-r border-sky-200 border-opacity-20">
                {routes.map((route) => (
                  <DashboardTile
                    active={path === route.link}
                    href={route.link}
                    key={route.text}
                    icon={route.icon}
                  >
                    {route.text}
                  </DashboardTile>
                ))}
              </div>

              <div className="w-284 overflow-y-auto flex justify-around">
                {children}
              </div>
            </div>
            <div className="mb-16 z-50 block">
              <NavBar getTitle={() => getRouteNameFromPath()} />
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

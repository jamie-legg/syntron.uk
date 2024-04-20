"use client";

import { usePathname } from "next/navigation";
import { DashboardTile } from "../dashboard/DashboardTile";
import { NavBar } from "./Navbar";

const routes = [
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

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const getRouteNameFromPath = () => {
    if (path === "/") return "Home";
    return routes.filter((route) => route.link.includes(path))[0].text;
  };

  return (
    <div className="z-10 absolute top-0">
      <div className="h-screen w-screen overflow-hidden">
        <div className="flex w-full justify-center h-full items-center">
          <div
            className={`h-max w-max rounded-lg shadow-lg mx-8
               relative overflow-hidden bg-opacity-50 text-sky-400 border border-sky-400 border-opacity-30
               backdrop-filter backdrop-blur-sm pr-5
              transition-all duration-200
      `}
          >
            <div className="mt-2 pl-5">
              <NavBar title={getRouteNameFromPath()} />
            </div>
            <div className="flex">
              <div className="flex flex-col w-48 gap-y-2 my-2">
                {routes.map((route) => (
                  <DashboardTile
                    active={path === route.link}
                    href={route.link}
                    key={route.text}
                  >
                    {route.text}
                  </DashboardTile>
                ))}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

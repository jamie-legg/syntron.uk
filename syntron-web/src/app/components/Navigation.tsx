"use client";

import { usePathname } from "next/navigation";
import { DashboardTile } from "../dashboard/DashboardTile";
import { NavBar } from "./Navbar";

const routes = [
  { color: "gray", text: "Download", link: "/download" },
  { color: "green", text: "How to Play", link: "/guide/play" },
  { color: "blue", text: "Get Good", link: "/guide/improve" },
  { color: "yellow", text: "Aesthetics", link: "/guide/aesthetics" },
  { color: "pink", text: "Leaderboard", link: "/leaderboard" },
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
    return routes.find((route) => path.includes(route.link))?.text ?? "Not Found";
  };

  return (
    <div className="z-10 fixed top-0 w-screen h-screen p-8">
      <div className="flex justify-center items-center h-full">
        <div className="w-full rounded-lg shadow-lg h-full relative bg-opacity-50 text-sky-400 border border-sky-400 border-opacity-30 backdrop-filter backdrop-blur-sm pr-5 transition-all duration-200">
          <div className="mb-12 z-50 block">
            <NavBar title={getRouteNameFromPath()} />
          </div>
          <div className="flex">  {/* Adjust height as necessary */}
            <div className="flex flex-col w-48 gap-y-2 my-2 overflow-y-auto">
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
            <div className="w-284 overflow-y-auto">
  {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

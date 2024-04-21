import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

export const DashboardTile = ({
  active,
  href,
  icon,
  children,
}: {
  active: boolean;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {

  return (
    <Link href={href}>
      <div
        className={`${
          active
            ? "text-pink-200 border-sky-200 border-opacity-100 bg-sky-700 rounded-tr-lg"
            : "text-pink-500 border-sky-400 border-opacity-40"
        } shadow-lg relative overflow-hidden bg-opacity-30 border-b 
   hover:text-pink-200 hover:border-pink-200 
           transition-all duration-200 cursor-pointer w-full px-4 py-2 border-svg tracking-widest group
      `}
      >
        <div className="flex justify-between w-full place-content-center items-center text-sm ">
        <div>
          <p>
          {children}
          </p>
        </div>
          <span className="mr-2 w-6 text-sky-500 group-hover:w-8 rounded-xl transition-all">{icon}</span>

        </div>
      </div>
    </Link>
  );
};

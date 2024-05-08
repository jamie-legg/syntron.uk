import Link from "next/link";
import React from "react";

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
            ? "text-slate-200 border-sky-200 border-opacity-100 bg-sky-700 font-bold"
            : "text-slate-300 border-sky-400 border-opacity-40"
        } shadow-lg relative overflow-hidden bg-opacity-30 border-b 
    hover:border-slate-200 
           transition-all duration-200 cursor-pointer w-full px-4 py-4 border-svg tracking-widest group
      `}
      >
        <div className="flex text-gradient-tertiary justify-center lg:justify-between w-full place-content-center items-center text-sm transition-all duration-200 group-hover:text-slate-200 group-hover:font-bold">
          <div className="hidden lg:flex text-xs place-content-center">
            <p>{children}</p>
          </div>
          <span className="w-6 rounded-xl transition-all duration-200 group-hover:text-slate-200">
            {icon}
          </span>
        </div>
      </div>
    </Link>
  );
};

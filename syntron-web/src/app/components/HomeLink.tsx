import Link from "next/link";
import { useState } from "react";
import Aside from "./Aside";

export const HomeLink = ({ page }: { page: string }) => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <div className="border-b border-sky-500 w-full h-max fixed inset-y-0 flex z-50 justify-between items-center tracking-widest uppercase backdrop-filter bg-black">
        <Link href="/">
          <div className="flex sapce-x-2">
            <h1 className="text-sky-500 tracking-tighter text-xl font-bold">
              Syntron.uk
            </h1>
            <h1 className="text-sky-200 tracking-tighter text-xl font-bold flex justify-center pr-1 ml-2 h-8">
              &gt;&nbsp;{page}
            </h1>
          </div>
        </Link>

        <button
          onClick={() => setAuthOpen(true)}
          className="pt-2 pr-1.5 rounded-lg border border-sky-400 border-opacity-15 hover:border-opacity-85 transition-all duration-200"
        >
          <div className="flex">
            <h1 className="text-sky-200 tracking-tighter font-bold flex justify-center pr-1 ml-2 h-8">
              &nbsp;Login
            </h1>
            <p className="pl-2 tracking-tighter text-xs mt-1 -mx-2">or</p>
            <h1 className="text-sky-200 tracking-tighter font-bold flex justify-center pr-1 ml-2 h-8">
              &nbsp;Register
            </h1>
          </div>
        </button>
      </div>
      <Aside isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

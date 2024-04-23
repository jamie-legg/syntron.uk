import Link from "next/link";
import { useState } from "react";
import Aside from "./auth/AuthAside";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const HomeLink = ({ page }: { page: string }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const { data } = useSession();
  const loggedIn = data?.user;
  return (
    <>
      <div className="border-b border-sky-500 border-opacity-30 w-full backdrop-filter backdrop-blur-xl h-max fixed inset-y-0 flex z-50 justify-between items-center  uppercase py-2 px-4">
        <Link href="/">
          <div className="flex sapce-x-2 tracking-widest">
            <h1 className="text-sky-400 tracking-tighter text-xl font-bold">
              Syntron.uk
            </h1>
            <h1 className="text-slate-300 tracking-tighter text-xl font-bold flex justify-center pr-1 ml-2 h-8">
              |&nbsp;{page}
            </h1>
          </div>
        </Link>
        {loggedIn && (
          <Link href="/dashboard">
            <button className="pt-2 pr-1.5 rounded-lg border border-sky-400 border-opacity-15 hover:border-opacity-85 transition-all duration-200">
              <h1 className="text-sky-200 tracking-tighter font-bold flex justify-center pr-1 ml-2 h-8">
                &nbsp;Dashboard
              </h1>
            </button>
          </Link>
        )}
        <Button onClick={() => setAuthOpen(true)}>&nbsp;Login or Register</Button>
      </div>
      <Aside isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

import page from "@/app/page";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Aside from "./auth/AuthAside";
import { Button } from "./ui/button";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";

export const NavBar = ({ title }: { title: string }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const { data } = useSession();
  const name = data?.user?.name;
  const image = data?.user?.image;
  return (
    <div>
      <div className="border-b border-sky-500 border-opacity-30 w-full backdrop-filter backdrop-blur-xl h-max fixed inset-y-0 flex z-50 justify-between items-center  uppercase py-2 px-4">
        <Link href="/">
          <div className="flex space-x-2 tracking-widest ml-32">
            <h1 className="text-sky-400 tracking-tighter text-xl font-bold">
              Syntron.uk
            </h1>
            <h1 className="text-slate-300 tracking-tighter text-xl font-bold flex justify-center pr-1 ml-2 h-8">
              |&nbsp;{title}
            </h1>
          </div>
        </Link>
        {name ? (
          <Button onClick={() => signOut()}>
          <Image src={image!} alt={name} width={32} height={32} className="rounded-full -mt-1 pb-1" />
          &nbsp;{name}</Button>
        ) : (
          <Button onClick={() => setAuthOpen(true)}>
            <UserIcon className="h-6 w-6" />
            &nbsp;Login

          </Button>
        )}
      </div>
      <Aside isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

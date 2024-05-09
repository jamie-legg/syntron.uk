import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Aside from "./auth/AuthAside";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ArchiveBoxXMarkIcon, Square2StackIcon, UserIcon, PowerIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation'

export const NavBar = ({ getTitle }: { getTitle: () => string }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const name = data?.user?.name;
  const image = data?.user?.image;
  return (
    <div>
      <div className="border-b border-sky-500 border-opacity-30 w-full backdrop-filter backdrop-blur-xl h-max fixed inset-y-0 flex z-50 justify-between items-center  uppercase py-2 px-4">
        <Link href="/">
          <div className="flex space-x-2 tracking-widest mt-2">
            <h1 className="text-gradient-primary tracking-tighter text-xl font-bold">
              Syntron.uk
            </h1>
            <h1 className="text-gradient-secondary tracking-tighter text-xl font-bold flex justify-center pr-1 ml-2 h-8">
              |&nbsp;{getTitle()}
            </h1>
          </div>
        </Link>
        {name ? (
                <Menu>
        <MenuButton className='h-max -mb-1.5'>
                    <Button>
          <Image src={image!} alt={name} width={32} height={32} className="rounded-full -mt-1 pb-1" />
          &nbsp;{name}
          
          </Button>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 z-50 origin-top-right rounded-xl border border-sky-500 border-opacity-50 backdrop-filter backdrop-blur-xl p-1 text-sm/6 text-sky-200 [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>

              <button 
              onClick={() => router.push("/u/" + name)}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-sky-500/10">

                <UserIcon className="size-4 fill-sky-500/85" />
                Profile
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
              </button>
            </MenuItem>

            <div className="my-1 h-px bg-white/5" />
                        <MenuItem>
              <button 
              onClick={() => signOut()}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-sky-500/10">
                <PowerIcon className="size-4 fill-sky-500/85" />
                Sign Out
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
        ) : (
          <Button onClick={() => setAuthOpen(true)}>
            <UserIcon className="h-6 w-6" />
            <p className="hidden lg:flex">&nbsp;Login</p>

          </Button>
        )}
      </div>
      <Aside isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

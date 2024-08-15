import { useSession, signIn, signOut } from "next-auth/react";

import Tabs from "../Tabs";
import { ReactNode, useEffect, useState } from "react";
import { TTabs } from "./TAuthTypes";

const initialTabs = [
  { id: "login", name: "Login", content: <div></div>, current: true },
  { id: "register", name: "Sign Up", content: <div></div>, current: false },
];
export default function AuthForm() {
  const [tabs, setTabs] = useState<TTabs[]>(initialTabs);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const loginTab = tabs.find((tab) => tab.id === "login");
      setIsLogin(loginTab?.current ?? true);
  }, [tabs]);
  return (
    <>
      {/* <Tabs tabs={tabs} setTabs={setTabs} /> */}
      {isLogin ?
      <div className="flex min-h-full flex-1 flex-col justify-start mt-6 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px] mt-12">
          <div className="p shadow sm:rounded-lg">
            {/* <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-sky-500"
                >
                  Username/Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full bg-sky-950 rounded-md border-0 py-1.5 text-sky-300 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-sky-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-sky-500"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full bg-sky-950 rounded-md border-0 py-1.5 text-sky-300 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-sky-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-sky-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-sky-600 hover:text-sky-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Sign in
                </button>
              </div>
            </form> */}

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-sky-900" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="rounded-lg px-6 text-sky-300 bg-sky-900">
                  Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <button
                  onClick={() =>
                    signIn("discord", {
                      redirect: false,
                    })
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#5865F2] px-3 py-2 text-sm font-semibold text-sky-100 shadow-sm hover:bg-[#4855e2] focus-visible:ring-transparent"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 -28.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                        fill-rule="nonzero"
                        fill="#E0F2FE"
                      ></path>
                    </g>
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    Discord
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       : 
       <div className="flex min-h-full flex-1 flex-col justify-start mt-6 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-[480px] mt-12">
    <div className="p shadow sm:rounded-lg">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-sky-500">
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full bg-sky-950 rounded-md border-0 py-1.5 text-sky-300 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-sky-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-sky-500">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full bg-sky-950 rounded-md border-0 py-1.5 text-sky-300 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-sky-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-sky-500">
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="password-confirm"
              name="password-confirm"
              type="password"
              required
              className="block w-full bg-sky-950 rounded-md border-0 py-1.5 text-sky-300 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-sky-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
}
    </>
  );
}

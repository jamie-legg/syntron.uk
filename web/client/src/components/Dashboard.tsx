import { GameHistory } from "@/types/THistory";
import { useEffect, useState } from "react";
import RecentHistory from "./RecentHistory";
import { getHistory } from "@/services/api";
import { useSession } from "next-auth/react";
import { GAME_URL, STEAM_URL } from "@/app/consts";

export default function Dashboard() {
  const [history, setHistory] = useState<GameHistory[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getHistory()
        .then((response) => {
          console.log("response", response);

          setHistory(response.data.data);
        })
        .catch((e) => console.error("Failed to fetch history:", e));
    }
  }, [status]);

  return (
    <div className="flex-col w-full">
      <div className="flex flex-col w-full justify-between my-2 mx-4">
        <span className="text-2xl my-3 text-sky-300">
          Welcome{session?.user ? " back" : ""},
          {session?.user ? (
            <span className="px-2 rounded-lg">{session.user.name}</span>
          ) : (
            <span className="px-2 rounded-lg">User</span>
          )}
        </span>
        {session?.user ? (
          <div></div>
        ) : (
          <>
            <span className="text-xl font-thin my-4">
              This resource acts as a hub for the competitive side of{" "}
              <a className="font-normal hover:underline text-sky-300" href={GAME_URL}>
                Retrocycles.
              </a>{" "}
              If you want to find out more about who we are and what we do,
              check out{" "}
              <a className="font-normal hover:underline text-sky-300" href="/discord">
                Discord
              </a> or{" "}
                <a className="font-normal hover:underline text-sky-300" href={STEAM_URL}>
                the game on Steam
                </a>
              .
            </span>

            <span className="text-xl border-b border-sky-500 text-sky-200 pb-8 my-4 ">
              The grid awaits.
            </span>
          </>
        )}
        {history.length > 0 ? (
          <div className="w-full">
            <RecentHistory history={history} />
          </div>
        ) : (
          <span className="text-xl font-thin my-4 text-sky-300">
            Login to view recent games.
          </span>
        )}
      </div>
    </div>
  );
}

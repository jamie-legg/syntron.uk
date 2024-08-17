import { GameHistory } from "@/types/THistory";
import clsx from "clsx";
import Link from "next/link";
import { parse } from "path";

export default function RecentHistory({ history }: { history: GameHistory[] }) {
  const relativeDateString = (date: string) => {
    const numberInput = parseInt(date);
    // input is in seconds
    const then = new Date(numberInput * 1000);
    const now = new Date();

    const diff = now.getTime() - then.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    return years > 0
      ? `${years} year${years > 1 ? "s" : ""} ago`
      : months > 0
      ? `${months} month${months > 1 ? "s" : ""} ago`
      : weeks > 0
      ? `${weeks} week${weeks > 1 ? "s" : ""} ago`
      : days > 0
      ? `${days} day${days > 1 ? "s" : ""} ago`
      : hours > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ago`
      : minutes > 0
      ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
      : `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const teamToColor = (team: string) => {
    // get the first character after the first space
    const color = team.split(" ")[1][0];
    switch (color) {
      case "P":
        return "text-purple-500";
      case "O":
        return "text-orange-500";
      case "U":
        return "text-cyan-500";
      case "G":
        return "text-yellow-500";
      default:
        return "text-white";
    }
  };

  const teamToBorderColor = (team: string) => {
    // get the first character after the first space
    const color = team.split(" ")[1][0];
    console.log('color', color);
    
    switch (color) {
      case "P":
        return "border-purple-500";
      case "O":
        return "border-orange-500";
      case "U":
        return "border-cyan-500";
      case "G":
        return "border-yellow-500";
      default:
        return "border-white";
    }
  };
  return (
    <div className="fixed inset-y-8 mt-20 z-0 flex flex-col xl:w-max border-t border-sky-300">
      <div className="flex w-full grow flex-col gap-y-5 overflow-y-auto">
        <ul role="list" className="grid grid-cols-2 xl:grid-cols-3 w-full">
          {history.map((game, index) => {
            const firstPlacePlayer = game.players.reduce((acc, player) => {
              if (player.place === 1) {
                acc = player;
              }
              return acc;
            });

            return (
              <div
                key={index}
                className={clsx(
                  teamToBorderColor(firstPlacePlayer.team),
                  `justify-between border rounded-lg hover:border-opacity-100 border-opacity-50 p-2 m-2`
                )}
              >
                <span className="text-xl font-thin my-4">
                  <div className={`grid grid-cols-2`}>
                    {game.players.map((player, index) => {
                      const place = player.place;

                      return (
                        <div key={index}
                          className={clsx(
                            teamToColor(player.team),
                            `text-xl font-thin w-full flex justify-between`
                          )}
                        >
                        <Link href={`/u/${player.player}`}>
                          <span className="text-xl font-thin pl-1 hover:underline">
                            {player.player}
                          </span>
                        </Link>
                          <span className="text-sm font-thin mt-2 pr-1">
                            {player.score}
                          </span>
                        </div>
                      );
                    })}
                    <span className="text-xs font-thin mt-4 uppercase">
                      {relativeDateString(game.date)}
                    </span>
                  </div>
                </span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

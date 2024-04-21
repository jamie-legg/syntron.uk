import { TRanking } from "@/types/TApi";
import { ArrowDownIcon, ArrowUpIcon, Bars2Icon } from "@heroicons/react/24/outline";

export default function RankCard({playerRank}: {playerRank: TRanking}) {
    const {
        rank,
        name,
        elo,
        latestChange,
        winrate,
        avgPlace,
        netPoints,
        avgScore,
        highScore,
        kd,
        lastSeen,
    } = playerRank;
  return (
  <div
  className="rounded-lg border border-sky-900 text-card-foreground shadow-sm w-full max-w-md p-6 grid gap-4 relative"
  data-v0-t="card"
>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white font-semibold rounded-md px-2 py-1">#{rank}</div>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="bg-gray-100 rounded-md px-2 py-1 text-sm dark:bg-gray-800">{elo} ELO</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
        {
          parseInt(latestChange) >= 0
          ? 
          parseInt(latestChange) === 0 ?
          <Bars2Icon className="w-4 h-4 text-gray-500" /> :
          <ArrowUpIcon className="w-4 h-4 text-green-500" />
          : <ArrowDownIcon className="w-4 h-4 text-red-500" />
}
          <span className="text-sm">{latestChange} ELO</span>
        </div>
        <div className="text-sm text-right">{winrate}% Winrate</div>
        <div className="text-sm">{avgPlace} Avg. Place</div>
        <div className="text-sm text-right">{netPoints} Net Points</div>
        <div className="text-sm">{avgScore} Avg. Score</div>
        <div className="text-sm text-right">{highScore} Highest Score</div>
        <div className="text-sm">{kd} K/D Ratio</div>
        <div className="text-xs text-right">Last Seen: {lastSeen}</div>
      </div>
    </div>
  )
}

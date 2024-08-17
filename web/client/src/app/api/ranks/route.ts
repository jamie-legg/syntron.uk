import { nocache } from "@/lib/utils";
import { TRanking } from "@/types/TApi";
import axios from "axios";



function parseRankings(htmlContent: string): object[] {
  const rankings: TRanking[] = [];
  const headers = [
    "rank",
    "name",
    "elo",
    "latestChange",
    "changeDate",
    "winrate",
    "avgPlace",
    "netPoints",
    "avgScore",
    "highScore",
    "kd",
  ];

  const rowRegex = /<tr>(.*?)<\/tr>/gs; 
  let rowMatch = rowRegex.exec(htmlContent); 

  while ((rowMatch = rowRegex.exec(htmlContent)) !== null) {
    const cellRegex = /<td[^>]*>(.*?)<\/td>/gs;
    const cells: string[] = [];
    let cellMatch;

    while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
      let cellContent = cellMatch[1];
      cellContent = cellContent
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
      cells.push(cellContent);
    }

    if (cells.length > 0) {
      const rowObject: any = {};
      headers.forEach((header, i) => {
        rowObject[header] = cells[i];
      });

      rankings.push(rowObject as TRanking);
    }
  }

  rankings.forEach((rank: any) => {
    rank.changeDate = rank.changeDate.split(" ");
    rank.changeDate.shift();
    rank.lastSeen = rank.changeDate.join(" ");
    delete rank.changeDate;
  });

  rankings.shift();

  return rankings.slice(0, 100);
}
export async function GET(request: Request) {
  try {
    const rawRanks = await axios.get("https://www.armanelgtron.tk/tststats/");
    const response = await rawRanks.data;
    const data = parseRankings(response);
    return new Response(JSON.stringify(data), nocache());
  } catch (error) {
    console.error(error);
  }
}

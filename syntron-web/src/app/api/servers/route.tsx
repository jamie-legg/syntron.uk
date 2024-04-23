import { nocache } from "@/lib/utils";
import { TRanking, TServerInfo, TServersMetadata } from "@/types/TApi";
import axios, { AxiosRequestConfig } from "axios";

function parseColor(stringToParse: string): string {
  if (!stringToParse) return "";
  // Regular expression to match hex codes and extraneous symbols
  const hexColorAndExtraRegex = /0x.{6}/g;

  // Replace all occurrences of the hex codes and then trim to remove extra spaces and symbols
  const cleanedName = stringToParse.replace(hexColorAndExtraRegex, ""); // Remove hex codes

  return cleanedName;
}

export async function GET(request: Request) {
  try {
    //nocache for the axios options
    const nocacheoptions: AxiosRequestConfig = {
      headers: {
        "Cache-Control": "no-cache",
      },
    }
    const rawRanks = await axios.get(
      "https://browser.armanelgtron.tk/servers_link/serverlist_v2.json"
    );
    const response = await rawRanks.data;
    const metadata = response[0] as TServersMetadata;
    response.shift();
    const servers = response as TServerInfo[];
    servers.forEach((server) => {
      server.server_name = parseColor(server.server_name);
      server.options = parseColor(server.options);
    });
    return new Response(JSON.stringify({ metadata, servers }), nocache());
  } catch (error) {
    console.error(error);
  }
}

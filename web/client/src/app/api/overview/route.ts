import { nocache } from "@/lib/utils";
import { TRanking } from "@/types/TApi";
import axios from "axios";

export async function GET(request: Request) {
  try {

    // Check for a specific user
    const url = new URL(request.url);
    const name = url.searchParams.get("name");


    if(!name) {
      return new Response('User required', { status: 400 });
    }

    const userHistory = await axios.get(
      `${process.env.NEXT_PUBLIC_HISTORY_API_URL}?id=tst&name=${name}&limit=1`
    );
    return new Response(JSON.stringify(userHistory.data), nocache());
  } catch (error) {
    console.error(error);
    return new Response('Error fetching data', { status: 500 });
  }
}

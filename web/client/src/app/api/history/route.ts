import { nocache } from "@/lib/utils";
import { TRanking } from "@/types/TApi";
import axios from "axios";

export async function GET(request: Request) {
  try {
    // Fetch the entire dataset
    const historyResponse = await axios.get(`${process.env.NEXT_PUBLIC_HISTORY_API_URL}?id=tst&type=history&limit=10`);
    const history = await historyResponse.data;

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Paginate the data
    const startIndex = (page - 1) * limit;
    const paginatedData = history.slice(startIndex, startIndex + limit);

    // Prepare the paginated response
    const response = new Response(JSON.stringify({
      page,
      limit,
      total: history.length,
      data: paginatedData,
    }));

    return response;
  } catch (error) {
    console.error(error);
    return new Response('Error fetching data', { status: 500 });
  }
}

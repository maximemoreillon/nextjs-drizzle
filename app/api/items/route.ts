import { createItem, readItems } from "@/lib/items";
import { type NextRequest } from "next/server";

// TODO: error handling
export async function POST(request: Request) {
  const properties = await request.json();
  // TODO: validation
  // IDEA: use drizzle-zod
  const newItem = await createItem(properties);
  return Response.json(newItem);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const items = await readItems(Object.fromEntries(searchParams));
  return Response.json(items);
}

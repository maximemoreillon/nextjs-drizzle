import { createItem, readItems } from "@/app/actions";
import { type NextRequest } from "next/server";

export async function POST(request: Request) {
  const properties = await request.json();
  const newGarment = await createItem(properties);
  return Response.json(newGarment);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const items = await readItems(Object.fromEntries(searchParams));
  return Response.json(items);
}

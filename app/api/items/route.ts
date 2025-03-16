import { createItem, readItems } from "@/app/actions";

export async function POST(request: Request) {
  const properties = await request.json();
  const newGarment = await createItem(properties);
  return Response.json(newGarment);
}

export async function GET() {
  const items = await readItems({});
  return Response.json(items);
}

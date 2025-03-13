import { readItems } from "@/app/actions";

// TODO: POST

export async function GET() {
  const items = await readItems();
  return Response.json(items);
}

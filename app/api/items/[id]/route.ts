import { readItem } from "@/app/actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const garment = await readItem(Number(id));
  return Response.json(garment);
}

import { deleteItem, readItem, updateItem } from "@/app/actions";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const garment = await readItem(Number(id));
  return Response.json(garment);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const properties = await request.json();
  await updateItem(Number(id), properties);
  return Response.json({ id });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteItem(Number(id));
  return Response.json({ id });
}

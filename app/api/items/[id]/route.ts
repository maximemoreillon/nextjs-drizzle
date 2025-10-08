import { deleteItem, readItem, updateItem } from "@/lib/items";

type Options = { params: Promise<{ id: string }> };

// TODO: error handling

export async function GET(_: Request, { params }: Options) {
  const { id } = await params;
  const item = await readItem(Number(id));
  return Response.json(item);
}

export async function PUT(request: Request, { params }: Options) {
  const { id } = await params;
  const properties = await request.json();
  const item = await updateItem(Number(id), properties);
  return Response.json(item);
}

export async function DELETE(_: Request, { params }: Options) {
  const { id } = await params;
  await deleteItem(Number(id));
  return Response.json({ id });
}

"use server";

import { redirect } from "next/navigation";
import { createItem, deleteItem, updateItem } from "@/lib/items";
import { z } from "zod";
import { itemsTable } from "@/db/schema";

export async function createItemAction(state: any, formData: FormData) {
  const itemCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    quantity: z.number().default(1),
  });

  const { error, data } = itemCreateSchema.safeParse({
    name: formData.get("name")?.toString(),
    description: formData.get("description")?.toString(),
    quantity: Number(formData.get("quantity")), // TODO: this looks nasty
  });

  if (error) return { error: error.message };

  const newItem = await createItem(data);

  return redirect(`/items/${newItem.id}`);
}

export async function updateItemAction(
  id: number,
  data: typeof itemsTable.$inferInsert
) {
  await updateItem(id, data);
}

export async function deleteItemAction(id: number) {
  await deleteItem(id);
  return redirect("/items");
}

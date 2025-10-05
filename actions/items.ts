"use server";

import { redirect } from "next/navigation";
import { createItem, deleteItem, updateItem } from "@/lib/items";
import { z } from "zod";
import { itemsTable } from "@/db/schema";

type Item = typeof itemsTable.$inferInsert;

export async function createItemAction(state: any, formData: FormData) {
  const itemCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    quantity: z.coerce.number().default(1),
  });

  const { error, data } = itemCreateSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
  });

  if (error) return { error: error.message };

  const newItem = await createItem(data);

  return redirect(`/items/${newItem.id}`);
}

export async function updateItemAction(id: number, data: Item) {
  await updateItem(id, data);
}

export async function deleteItemAction(id: number) {
  await deleteItem(id);
  return redirect("/items");
}

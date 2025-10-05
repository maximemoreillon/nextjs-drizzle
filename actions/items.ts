"use server";

import { redirect } from "next/navigation";
import { createItem, deleteItem, updateItem } from "@/lib/items";
import { z } from "zod";
import { itemsTable } from "@/db/schema";

// type Item = typeof itemsTable.$inferInsert;

const itemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  quantity: z.coerce.number().default(1),
});

// For ref, Next.js's official doc: export async function createPost(prevState: any, formData: FormData) { ... }
export async function createItemAction(state: any, formData: FormData) {
  const { error, data } = itemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
  });

  if (error) return { error: error.message };

  const newItem = await createItem(data);

  return redirect(`/items/${newItem.id}`);
}

export async function updateItemAction(
  id: number,
  state: any,
  formData: FormData
) {
  const { error, data } = itemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
  });

  if (error) return { error: error.message };

  await updateItem(id, data);
}

export async function deleteItemAction(id: number) {
  // TODO: error handling
  await deleteItem(id);
  return redirect("/items");
}

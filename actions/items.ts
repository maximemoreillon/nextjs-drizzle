import { createItem, deleteItem, updateItem } from "@/lib/items";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.coerce.number(),
});

export async function createItemAction(values: z.infer<typeof itemSchema>) {
  try {
    const newItem = await createItem(values);
    return { error: null, data: newItem };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function updateItemAction(
  id: number,
  values: z.infer<typeof itemSchema>
) {
  try {
    await updateItem(id, values);
    return { error: null };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function deleteItemAction(id: number) {
  try {
    await deleteItem(id);
    return { error: null };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

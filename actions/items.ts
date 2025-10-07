import { itemsTable } from "@/db/schema";
import { createItem, deleteItem, updateItem } from "@/lib/items";

export async function createItemAction(values: typeof itemsTable.$inferInsert) {
  try {
    const newItem = await createItem(values);
    return { error: null, data: newItem };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function updateItemAction(
  id: number,
  values: typeof itemsTable.$inferInsert
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

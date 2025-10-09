import { itemsTable } from "@/db/schema";
import { createItem, deleteItem, updateItem } from "@/lib/items";
import { redirect } from "next/navigation";

type Item = typeof itemsTable.$inferInsert;

export async function createItemAction(state: any, values: Item) {
  // TODO: Using let is not nice but needed so as to have redirect outside try/catch
  let newItem: typeof itemsTable.$inferSelect;
  try {
    newItem = await createItem(values);
  } catch (error: any) {
    return { error: error.message };
  }

  // NOTE: Cannot use redirect in try/catch block
  if (newItem) redirect(`/items/${newItem.id}`);
}

export async function updateItemAction(id: number, state: any, values: Item) {
  try {
    await updateItem(id, values);
    return { error: null, success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function deleteItemAction(state: any, id: number) {
  try {
    await deleteItem(id);
  } catch (error: any) {
    return { error: error.message };
  }

  return redirect("/items");
}

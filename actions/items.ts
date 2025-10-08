import { itemsTable } from "@/db/schema";
import { createItem, deleteItem, updateItem } from "@/lib/items";
import { redirect } from "next/navigation";

type Item = typeof itemsTable.$inferInsert;

export async function createItemAction(state: any, values: Item) {
  // TODO: Using let is not nice but need to have redirect outside try/catch
  let newItem: typeof itemsTable.$inferSelect;
  try {
    newItem = await createItem(values);
    // return { error: null, data: newItem };
    // redirect(`items/${newItem.id}`);
  } catch (error: any) {
    // TODO: error typing is not nice
    return { error: error.message };
  }

  // Cannot use redirect in try/catch block
  if (newItem) redirect(`/items/${newItem.id}`);
}

export async function updateItemAction(id: number, state: any, values: Item) {
  // export async function updateItemAction(id: number, values: Item) {
  try {
    await updateItem(id, values);
    return { error: null, success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function deleteItemAction(id: number) {
  try {
    await deleteItem(id);
    // return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }

  return redirect("/items");
}

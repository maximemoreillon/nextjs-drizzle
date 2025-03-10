"use server";

import { itemsTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createItem(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const quantity = formData.get("quantity");

  // TODO: ZOD validation
  if (!name) throw "Missing name";
  if (!description) throw "Missing description";
  if (!quantity) throw "Missing quantity";

  const newItem: any = {
    name,
    description,
    quantity,
  };

  const [{ id }] = await db.insert(itemsTable).values(newItem).returning();

  return redirect(`/items/${id}`);
}

export async function readItems() {
  const items = await db.select().from(itemsTable);
  return items;
}

export async function readItem(id: number) {
  const [item] = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.id, id));
  return item;
}
export async function deleteItem(id: number) {
  await db.delete(itemsTable).where(eq(itemsTable.id, id));
  return redirect("/items");
}

export async function updateItem(id: number, properties: any) {
  if (!id) throw "Missing id";

  await db
    .update(itemsTable)
    .set(properties)
    .where(eq(itemsTable.id, Number(id)));
}

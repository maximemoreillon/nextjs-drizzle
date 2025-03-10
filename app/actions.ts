"use server";

import { itemsTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

type NewItem = typeof itemsTable.$inferInsert;

export async function createItem(values: NewItem) {
  const [newItem] = await db.insert(itemsTable).values(values).returning();

  return newItem;
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

export async function updateItem(id: number, properties: NewItem) {
  if (!id) throw "Missing id";

  await db
    .update(itemsTable)
    .set(properties)
    .where(eq(itemsTable.id, Number(id)));
}

export async function deleteItem(id: number) {
  await db.delete(itemsTable).where(eq(itemsTable.id, id));
  return { id };
}

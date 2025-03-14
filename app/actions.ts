"use server";

import { itemsTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, count } from "drizzle-orm";

type NewItem = typeof itemsTable.$inferInsert;

export async function createItem(values: NewItem) {
  const [newItem] = await db.insert(itemsTable).values(values).returning();

  return newItem;
}

export async function readItems(queryParams: {
  [key: string]: string | string[] | undefined;
}) {
  const limit = Number(queryParams.limit || "5");
  const offset = Number(queryParams.offset || "0");

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(itemsTable);
  const items = await db
    .select()
    .from(itemsTable)
    .offset(Number(offset))
    .limit(Number(limit));
  return { total, items, limit, offset };
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

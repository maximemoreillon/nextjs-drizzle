"use server";

import { db } from "@/db/drizzle";
import { itemsTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";

type NewItem = typeof itemsTable.$inferInsert;

const defaultLimit = 10;

export async function createItem(values: NewItem) {
  const [newItem] = await db.insert(itemsTable).values(values).returning();
  return newItem;
}

export async function readItems(queryParams: {
  [key: string]: string | string[] | undefined;
}) {
  const limit = Number(queryParams.limit || defaultLimit);
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
  if (!id) throw new Error("Missing id");
  const [item] = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.id, id));
  return item;
}

export async function updateItem(id: number, properties: NewItem) {
  if (!id) throw new Error("Missing id");

  await db
    .update(itemsTable)
    .set(properties)
    .where(eq(itemsTable.id, Number(id)));
}

export async function deleteItem(id: number) {
  if (!id) throw new Error("Missing id");

  await db.delete(itemsTable).where(eq(itemsTable.id, id));
  return { id };
}

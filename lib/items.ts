"use server";

import { db } from "@/db/drizzle";
import { itemsTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { z } from "zod";

type NewItem = typeof itemsTable.$inferInsert;

export async function createItem(values: NewItem) {
  const [newItem] = await db.insert(itemsTable).values(values).returning();
  return newItem;
}

type QueryParams = {
  [key: string]: string | string[] | undefined;
};

export async function readItems(queryParams: QueryParams) {
  const paramsSchema = z.object({
    limit: z.coerce.number().default(10),
    offset: z.coerce.number().default(0),
  });

  const { limit, offset } = paramsSchema.parse(queryParams);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(itemsTable);

  const items = await db.select().from(itemsTable).offset(offset).limit(limit);

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

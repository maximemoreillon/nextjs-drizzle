"use server"

import { itemsTable } from "@/db/schema"
import { db } from "@/db/drizzle"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

export async function createItem(formData: FormData) {
  const name = formData.get("name")
  const description = formData.get("description")
  const quantity = formData.get("quantity")

  // TODO: ZOD validation
  if (!name) throw "Missing name"
  if (!description) throw "Missing description"
  if (!quantity) throw "Missing quantity"

  const newItem: any = {
    name,
    description,
    quantity,
  }

  const [{ id }] = await db.insert(itemsTable).values(newItem).returning()

  return redirect(`/items/${id}`)
}

export async function deleteItem(id: number) {
  await db.delete(itemsTable).where(eq(itemsTable.id, id))
  return redirect("/items")
}

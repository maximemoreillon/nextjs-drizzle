"use server"

import { itemsTable } from "@/db/schema"
import { db } from "@/db/drizzle"
import { redirect } from "next/navigation"

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

  await db.insert(itemsTable).values(newItem)

  // TODO: Redirect
  return redirect("/items")
}

export async function deleteItem(id: number) {
  console.log(id)
}

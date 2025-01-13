import { db } from "@/db/drizzle"
import { itemsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"

// TODO: typing of params

export default async function Item({ params }: any) {
  const { id } = await params

  const [item] = await db.select().from(itemsTable).where(eq(itemsTable.id, id))

  return (
    <div>
      <h2>Item</h2>
      <div>
        <Link href="/items">Return to items list</Link>
      </div>
      <div>Name: {item.name}</div>
      <div>ID: {item.id}</div>
      <div>Description: {item.description}</div>
      <div>Quantity: {item.quantity}</div>
    </div>
  )
}

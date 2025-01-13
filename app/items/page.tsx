import { db } from "@/db/drizzle"
import { itemsTable } from "@/db/schema"
import Link from "next/link"

export default async function Items() {
  const items = await db.select().from(itemsTable)

  return (
    <div>
      <h2 className="text-2xl my-4">Items</h2>
      <div className="my-4">
        <Link href="/items/new">New item</Link>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>
              {item.name} (ID: {item.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { db } from "@/db/drizzle";
import { itemsTable } from "@/db/schema";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { readItems } from "../actions";

export default async function Items() {
  const items = await readItems();

  return (
    <div>
      <h2 className="text-2xl my-4">Items</h2>
      <div className="my-4">
        <Link
          href="/items/new"
          className={buttonVariants({ variant: "outline" })}
        >
          New item
        </Link>
      </div>

      <Table>
        <TableCaption>A list of items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>See</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell>
                <Link
                  href={`/items/${item.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  See
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

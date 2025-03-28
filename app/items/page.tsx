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
import ItemsPagination from "@/components/itemsPagination";

export default async function Items({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { items, total, offset, limit } = await readItems(await searchParams);

  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl my-4">Items</h2>
        <Link href="/items/new" className={buttonVariants({})}>
          New item
        </Link>
      </div>

      <Table>
        <TableCaption>Total items: {total}</TableCaption>
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
      <ItemsPagination total={total} offset={offset} limit={limit} />
    </div>
  );
}

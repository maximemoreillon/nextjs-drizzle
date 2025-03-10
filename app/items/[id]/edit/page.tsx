import { readItem, updateItem } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Params = Promise<{ id: string }>;

export default async function Item({ params }: { params: Params }) {
  const { id } = await params;

  const item = await readItem(Number(id));

  return (
    <div>
      <h2>Item</h2>

      <div>
        <Link href={`/items/${id}`} className="flex items-center gap-2">
          <MoveLeft />
          <span>Return to item</span>
        </Link>
      </div>

      <form action={updateItem}>
        <input type="hidden" name="id" value={item.id} />
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            defaultValue={item.description}
          />
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" defaultValue={item.name} />
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            defaultValue={item.quantity}
          />
        </div>

        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}

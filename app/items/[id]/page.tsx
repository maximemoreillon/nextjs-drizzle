import DeleteItemButton from "@/components/deleteItemButton";
import ReturnLink from "@/components/returnLink";
import { readItem } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ItemEditForm } from "@/components/itemEditForm";

type Params = Promise<{ id: string }>;

export default async function Item({ params }: { params: Params }) {
  const { id } = await params;

  const item = await readItem(Number(id));

  return (
    <div>
      <h2>Item</h2>
      <ReturnLink />

      <ItemEditForm item={item} />

      <div>
        <DeleteItemButton id={Number(id)} />
      </div>
    </div>
  );
}

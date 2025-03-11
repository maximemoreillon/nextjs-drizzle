import DeleteItemButton from "@/components/deleteItemButton";
import ReturnLink from "@/components/returnLink";
import { readItem } from "@/app/actions";
import { ItemEditForm } from "@/components/itemEditForm";

type Params = Promise<{ id: string }>;

export default async function Item({ params }: { params: Params }) {
  const { id } = await params;

  const item = await readItem(Number(id));

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl my-2">Item</h2>
        <DeleteItemButton id={item.id} />
      </div>
      <ReturnLink />

      <ItemEditForm item={item} />
    </div>
  );
}

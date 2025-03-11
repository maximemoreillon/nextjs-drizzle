"use client";

import { Button } from "@/components/ui/button";
import { deleteItem } from "@/app/actions";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteItemButton(props: Props) {
  const router = useRouter();
  async function handleDelete() {
    await deleteItem(props.id);
    router.push("/items");
  }
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete item
    </Button>
  );
}

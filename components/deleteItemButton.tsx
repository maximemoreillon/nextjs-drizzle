"use client";

import { deleteItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type Props = {
  id: number;
};

export default function DeleteItemButton(props: Props) {
  const [pending, startTransition] = useTransition();

  async function handleDelete() {
    if (!confirm("Delete item?")) return;
    startTransition(async () => await deleteItemAction(props.id));
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={pending}>
      Delete item
    </Button>
  );
}

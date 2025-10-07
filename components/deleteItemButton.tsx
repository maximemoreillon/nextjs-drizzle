"use client";

import { deleteItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteItemButton(props: Props) {
  const [pending, setPending] = useState(false);
  async function handleDelete() {
    if (!confirm("Delete item?")) return;
    setPending(true);
    const { error } = await deleteItemAction(props.id);
    setPending(false);
    // TODO: toast
    if (error) alert(error);
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={pending}>
      Delete item
    </Button>
  );
}

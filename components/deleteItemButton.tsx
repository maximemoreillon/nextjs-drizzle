"use client";

import { deleteItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState, useEffect } from "react";

type Props = {
  id: number;
};

export default function DeleteItemButton(props: Props) {
  const [state, action, pending] = useActionState(deleteItemAction, null);

  async function handleDelete() {
    if (!confirm("Delete item?")) return;
    startTransition(() => action(props.id));
  }

  useEffect(() => {
    if (state?.error) alert(state?.error);
  }, [state]);

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={pending}>
      Delete item
    </Button>
  );
}

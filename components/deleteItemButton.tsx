"use client";

import { deleteItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
};

export default function DeleteItemButton(props: Props) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Delete item?")) return;
    setPending(true);
    const { error } = await deleteItemAction(props.id);
    setPending(false);
    if (error) alert(error);
    else router.push("/items");
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={pending}>
      Delete item
    </Button>
  );
}

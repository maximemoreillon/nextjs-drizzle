"use client";

import { Button } from "@/components/ui/button";
import { deleteItem } from "@/lib/items";
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
    await deleteItem(props.id);
    setPending(false);
    router.push("/items");
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={pending}>
      Delete item
    </Button>
  );
}

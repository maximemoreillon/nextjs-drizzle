"use client"

import { Button } from "@/components/ui/button"
import { deleteItem } from "@/app/actions"

export default function DeleteItemButton() {
  return <Button onClick={() => deleteItem(1)}>Create item</Button>
}

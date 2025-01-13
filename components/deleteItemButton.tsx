"use client"

import { Button } from "@/components/ui/button"
import { deleteItem } from "@/app/actions"

type Props = {
  id: number
}

export default function DeleteItemButton(props: Props) {
  return <Button onClick={() => deleteItem(props.id)}>Delete item</Button>
}

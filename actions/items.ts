import { createItem } from "@/lib/items";
import { redirect } from "next/navigation";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.coerce.number(),
});

export async function createItemAction(values: z.infer<typeof itemSchema>) {
  try {
    const newItem = await createItem(values);
    return { error: null, data: newItem };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

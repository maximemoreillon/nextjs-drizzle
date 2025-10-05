"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateItem } from "@/lib/items";
import { itemsTable } from "@/db/schema";
import { useTransition } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  quantity: z.coerce.number(),
});

type Item = typeof itemsTable.$inferSelect;
type Props = { item: Item };

export function ItemEditForm(props: Props) {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.item.name,
      description: props.item.description || "",
      quantity: props.item.quantity,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => await updateItem(props.item.id, values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Item" {...field} />
              </FormControl>
              <FormDescription>Name of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="A very special item" {...field} />
              </FormControl>
              <FormDescription>Description of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="2" {...field} type="number" />
              </FormControl>
              <FormDescription>Quantity of said item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={pending}>
            Save item
          </Button>
        </div>
      </form>
    </Form>
  );
}

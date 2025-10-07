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
import { itemsTable } from "@/db/schema";
import { useState } from "react";

import { updateItem } from "@/lib/items";

type Props = { item: typeof itemsTable.$inferSelect };

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  quantity: z.coerce.number(),
});

export function ItemEditForm(props: Props) {
  const form = useForm({
    defaultValues: {
      name: props.item.name,
      description: props.item.description || "",
      quantity: props.item.quantity,
    },
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    try {
      await updateItem(props.item.id, values);
      // TODO: success message
    } catch (error) {
      setError("Item update failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button type="submit" disabled={pending}>
          Save item
        </Button>
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </Form>
  );
}

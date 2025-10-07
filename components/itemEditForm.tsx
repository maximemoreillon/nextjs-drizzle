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
import { useActionState } from "react";
import { updateItemAction } from "@/actions/items";

type Props = { item: typeof itemsTable.$inferSelect };

export function ItemEditForm(props: Props) {
  const form = useForm({
    defaultValues: {
      name: props.item.name,
      description: props.item.description || "",
      quantity: props.item.quantity,
    },
  });

  const [state, formAction, pending] = useActionState(
    updateItemAction.bind(null, props.item.id),
    null
  );

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
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
        {state?.error && (
          <div className="text-red-600 text-center">{state.error}</div>
        )}
        {state?.success && (
          <p className="text-green-600 text-center">Updated successful</p>
        )}
      </form>
    </Form>
  );
}

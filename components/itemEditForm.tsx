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
import { startTransition, useActionState, useEffect, useState } from "react";
import { updateItemAction } from "@/actions/items";

type Props = { item: typeof itemsTable.$inferSelect };

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  quantity: z.coerce.number(),
});

export function ItemEditForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.item.name,
      description: props.item.description || "",
      quantity: props.item.quantity,
    },
  });

  // const [pending, setPending] = useState(false);
  // const [error, setError] = useState("");

  const updateActionWithId = updateItemAction.bind(null, props.item.id);
  const [state, action, pending] = useActionState(updateActionWithId, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setPending(true);
    // const res = await updateItemAction(props.item.id, values);
    // if (res?.error) setError(res?.error);
    // setPending(false);
    // alert("Update successful"); // TODO: use a toast

    // PROBLEM: cannot wait until action execution is finished to show success
    // SOLUTION: useEffect as hereunder
    startTransition(() => {
      action(values);
    });

    useEffect(() => {
      if (state?.success) alert("Success");
    }, [state]);
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
        {state?.error && (
          <div className="text-red-600 text-center">{state.error}</div>
        )}
        {/* {error && <div className="text-red-600 text-center">{error}</div>} */}
      </form>
    </Form>
  );
}

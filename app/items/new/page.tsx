"use client";

import ReturnLink from "@/components/returnLink";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useActionState } from "react";
import { createItemAction } from "@/actions/items";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  quantity: z.coerce.number(),
});

export default function newItem() {
  const [state, action, pending] = useActionState(createItemAction, undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1,
    },
  });

  return (
    <div>
      <div>
        <ReturnLink />
      </div>
      <h2 className="text-2xl my-2">New Item</h2>
      <Form {...form}>
        <form className="space-y-8" action={action}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Banana" {...field} />
                </FormControl>
                <FormDescription>The item name</FormDescription>
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
                  <Input placeholder="A yellow banana" {...field} />
                </FormControl>
                <FormDescription>A description for the item</FormDescription>
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
                  <Input placeholder="22" {...field} type="number" />
                </FormControl>
                <FormDescription>Quantity of the item</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>
            Submit
          </Button>
        </form>
      </Form>
      {state?.error && <div>{state.error}</div>}
    </div>
  );
}

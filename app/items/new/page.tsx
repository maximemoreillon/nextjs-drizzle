"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { createItemAction } from "@/actions/items";
import ReturnLink from "@/components/returnLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function newItem() {
  const [state, action, pending] = useActionState(createItemAction, null);

  const form = useForm({
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
      {state?.error && (
        <div className="text-red-600 text-center">{state.error}</div>
      )}
    </div>
  );
}

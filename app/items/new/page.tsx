"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { createItemAction } from "@/actions/items";
import ReturnLink from "@/components/returnLink";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  quantity: z.coerce.number(),
});

export default function newItem() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1,
    },
  });

  const router = useRouter();
  const [pending, setPending] = useState(false); // TODO: consider using useTransition()
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    const { error, data } = await createItemAction(values);
    if (error) setError(error);
    else if (data) router.push(data.id.toString());
    setPending(false);
  }

  return (
    <div>
      <div>
        <ReturnLink />
      </div>
      <h2 className="text-2xl my-2">New Item</h2>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
      {error && <div className="text-red-600 text-center">{error}</div>}
    </div>
  );
}

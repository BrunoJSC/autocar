"use client";

import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";

export function CarForm() {
  const form = useForm();
  return (
    <div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary-foreground">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

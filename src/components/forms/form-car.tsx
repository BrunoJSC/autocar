"use client";

import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormFieldComponent from "@/components/forms/form-field-component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 digitos" }),
});

export function FormCar() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldComponent
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Digite o nome"
        />

        <FormFieldComponent
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite o email"
        />

        <FormFieldComponent
          control={form.control}
          name="phone"
          label="Celular"
          placeholder="Digite o numero do celular"
        />

        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  );
}

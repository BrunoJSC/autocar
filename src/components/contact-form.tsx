"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  cpf: z
    .string()
    .min(11, { message: "O CPF deve ter pelo menos 11 caracteres" }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z
    .string()
    .min(9, { message: "O telefone deve ter pelo menos 9 caracteres" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    message: string;
  };
  initialMessage?: string;
};

export function ContactForm({
  onSubmit,
  defaultValues,
  initialMessage,
}: ContactFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      message: initialMessage || "",
    },
  });

  const [message, setMessage] = useState(
    defaultValues?.message || initialMessage || ""
  );

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      form.setValue("message", initialMessage);
    }
  }, [initialMessage, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="CPF" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Telefone" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mensagem"
                  {...field}
                  value={message}
                  onChange={(e) => {
                    field.onChange(e);
                    setMessage(e.target.value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

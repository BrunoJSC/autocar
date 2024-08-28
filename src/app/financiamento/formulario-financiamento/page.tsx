"use client";

import { MaxWrapper } from "@/components/max-wrapper";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Função para calcular as parcelas
const calculateInstallments = (
  totalValue: number,
  downPayment: number,
  installments: number,
  interestRate: number
) => {
  const financedValue = totalValue - downPayment;
  const monthlyInterest = interestRate / 100;
  const pow = Math.pow(1 + monthlyInterest, installments);
  const installmentValue = (financedValue * pow * monthlyInterest) / (pow - 1);

  return { installmentValue: installmentValue.toFixed(2) };
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  cpf: z.string().min(11, {
    message: "O CPF deve ter pelo menos 11 caracteres",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres",
  }),
  price: z.number().min(1, {
    message: "O valor deve ser maior que 0",
  }),
  downPayment: z.number().min(0, {
    message: "O valor da entrada não pode ser negativo",
  }),
  installments: z.number().min(1, {
    message: "O número de parcelas deve ser pelo menos 1",
  }),
  interestRate: z.number().min(0, {
    message: "A taxa de juros não pode ser negativa",
  }),
});

export default function Page() {
  const [installmentValue, setInstallmentValue] = useState(""); // Estado para armazenar o valor da parcela

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      message: "",
      price: 0,
      downPayment: 0,
      installments: 12,
      interestRate: 2.5,
    },
  });

  const { watch, handleSubmit, setValue } = form;
  const watchFields = watch([
    "price",
    "downPayment",
    "installments",
    "interestRate",
  ]);

  const [price, downPayment, installments, interestRate] = watchFields;

  // Atualizar o valor das parcelas sempre que o preço, entrada, número de parcelas ou taxa de juros mudar
  useEffect(() => {
    if (
      price > 0 &&
      downPayment >= 0 &&
      installments > 0 &&
      interestRate >= 0
    ) {
      const result = calculateInstallments(
        price,
        downPayment,
        installments,
        interestRate
      );
      setInstallmentValue(result.installmentValue);
    }
  }, [price, downPayment, installments, interestRate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <MaxWrapper className="min-h-screen ">
      <section>
        <div className="">
          <Form {...form}>
            <Card className="max-w-xl mx-auto my-24">
              <CardHeader>
                <CardTitle>Financiamento</CardTitle>
                <CardDescription>
                  Entre em contato conosco. Dizendo por qual veículo você tem
                  interesse.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
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
                        <Textarea className="h-24" {...field} />
                      </FormControl>
                      <FormDescription>
                        Diga o carro ou moto que você se interessou.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Veículo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite o valor total do carro em interesse.
                      </FormDescription>
                      <p>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 2,
                        }).format(watch("price"))}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Adicionando campo para o valor de entrada */}
                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor de Entrada</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite o valor de entrada para o financiamento.
                      </FormDescription>
                      <p>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 2,
                        }).format(watch("downPayment"))}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Adicionando campos para número de parcelas e taxa de juros */}
                <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Parcelas</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite o número de parcelas desejado.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa de Juros (%)</FormLabel>
                      <FormControl>
                        <Input type="number" disabled {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite a taxa de juros mensal.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Mostrando o valor da parcela calculado */}
                {installmentValue && (
                  <div>
                    <p>
                      Valor da Parcela:{" "}
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 2,
                      }).format(parseFloat(installmentValue))}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Enviar
                </Button>
              </form>
            </Card>
          </Form>
        </div>
      </section>
    </MaxWrapper>
  );
}

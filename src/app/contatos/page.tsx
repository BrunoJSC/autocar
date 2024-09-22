"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();

  return (
    <MaxWrapper>
      <section className="min-h-screen">
        <div className="bg-contact-banner w-full bg-no-repeat bg-cover bg-center">
          <div className="flex flex-col items-center justify-center h-full w-full p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Encontramos o seu carro ideal!
              </h1>
              <p className="text-white text-lg mt-4">
                Venha ser mais um cliente e faça parte da nossa história
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Card className="mt-8 p-8 max-w-4xl mx-auto w-full">
            <CardHeader>
              <CardTitle>Contato</CardTitle>
              <CardDescription>Entre em contato</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <div>
                    <Label>Nome</Label>
                    <FormField
                      control={form.control}
                      name="..."
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu nome" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <FormField
                      control={form.control}
                      name="..."
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <FormField
                      control={form.control}
                      name="..."
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Digite seu email"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button size="lg" className="w-full">
                    Enviar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-4xl mx-auto mt-8">
            <div>
              <h2 className="text-2xl font-bold">Duvidas?</h2>
              <p className="text-sm mt-4 text-gray-500">
                Chame no WhatsApp através do botão abaixo para ser atendido por
                um de nossos especialistas!
              </p>

              <Link
                href="https://api.whatsapp.com/send?phone=5599999999999&text=Ol%C3%A1%20Pessoa%20de%20Contato"
                target="_blank"
                className="mt-4 inline-block"
              >
                <Button size="lg" className="w-full">
                  Chamar no WhatsApp
                </Button>
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Contato</h3>

              <p className="text-sm mt-4 text-gray-500">
                Nossos especialistas estão disponíveis para atender seu chamado
              </p>

              <p className="text-sm mt-4 text-gray-500">(11) 91367-4909</p>

              <p className="text-sm mt-4 text-gray-500">(11) 94072-3891</p>
              <p className="text-sm mt-4 text-gray-500">
                contato@autonegocie.com.br
              </p>
            </div>
          </div>
        </div>
      </section>
    </MaxWrapper>
  );
}

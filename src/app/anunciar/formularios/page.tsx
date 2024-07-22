"use client";

import { FormCar } from "@/components/forms/form-car";
import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-4 items-center">
        <h1 className="text-3xl font-bold">Formulário de anúncio</h1>

        <div>
          <Tabs defaultValue="vehicle" className="w-[800px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicle">Carro</TabsTrigger>
              <TabsTrigger value="password">Moto</TabsTrigger>
            </TabsList>
            <TabsContent value="vehicle">
              <Card>
                <CardHeader>
                  <CardTitle>Carro</CardTitle>
                  <CardDescription>
                    Preencha os dados do seu carro.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormCar />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Moto</CardTitle>
                  <CardDescription>
                    Preencha os dados da sua moto.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2"></CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MaxWrapper>
  );
}

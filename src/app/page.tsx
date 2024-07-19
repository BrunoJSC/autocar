import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/constants/services";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MaxWrapper>
        <div className="bg-porsche-banner h-screen w-full bg-no-repeat bg-cover bg-center">
          <div className="flex flex-col items-center justify-center h-full w-full p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Encontramos o seu carro ideal!
              </h1>
              <p className="text-white text-lg mt-4">
                Venha ser mais um cliente e faça parte da nossa história
              </p>
            </div>

            <div className="flex space-x-4 mt-8">
              <Button size="lg" asChild>
                <Link href="/carros">Catálogo</Link>
              </Button>

              <Button variant="secondary" size="lg" asChild>
                <Link href="/aninciar">Anuncie</Link>
              </Button>
            </div>
          </div>
        </div>
      </MaxWrapper>

      <MaxWrapper className="py-8 p-8">
        <section>
          <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-3xl font-bold">
              A melhor plataforma de negociação de veículos
            </h1>
            <p className="text-lg mt-4 text-center text-gray-700">
              A AutoNegocie revolucionou a maneira como as pessoas compram e
              vendem veículos. Como uma plataforma inovadora, ela se destaca por
              sua abordagem eficiente e segura de conectar compradores e
              vendedores.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-8 grid-cols-1">
            {services.map((service) => (
              <Card key={service.title} className="w-full p-4 space-y-4">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                    {service.icon}
                  </div>
                </CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-24" orientation="horizontal" />

        <section className="p-8">
          <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-3xl font-bold">
              Perguntas frequentes sobre a plataforma
            </h1>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.text}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </MaxWrapper>
    </main>
  );
}

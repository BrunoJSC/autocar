import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { financing } from "@/constants/financing";
import Image from "next/image";
import { FC } from "react";

// Componente para o item de financiamento
const FinancingItem: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
    <div>
      <h3 className="text-lg text-primary font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Componente para o cabeçalho do cartão
const CardHeaderSection: FC = () => (
  <CardHeader>
    <CardTitle className="">Financiamento</CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      O AutoNegocie é uma plataforma especializada em negociação de veículos,
      fornecendo uma gama de ferramentas de comunicação e recursos de negócios
      que agilizam o processo de venda do seu automóvel.
    </CardDescription>
  </CardHeader>
);

const Page: FC = () => (
  <MaxWrapper>
    <section className="min-h-screen flex flex-col justify-center p-2">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-lg my-6 mx-auto p-4 gap-4  shadow-lg">
        <div className="flex-1">
          <CardHeaderSection />
          <div className="flex justify-center md:justify-start mt-4 md:mt-0">
            <Image
              src="/icons/finance.svg"
              alt="finance"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
        <div className="flex-1 space-y-4 mt-4 md:mt-0">
          {financing.map((item) => (
            <FinancingItem
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-lg my-6 mx-auto p-4 gap-4 bg-card-foreground shadow-lg items-center">
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold text-primary">
            Peça seu financiamento
          </h2>
          <Button variant="default" className="w-full">
            Solicitar financiamento
          </Button>
        </div>
        <Separator
          orientation="vertical"
          className="w-px h-28 bg-muted-foreground hidden md:block"
        />
        <Separator
          orientation="horizontal"
          className="bg-muted-foreground block md:hidden"
        />
        <div className="flex-1 space-y-4 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-primary">Dúvidas?</h2>
          <p className="text-sm text-muted-foreground">
            Chame no WhatsApp através do botão abaixo para ser atendido por um
            de nossos especialistas!
          </p>

          <Button variant="secondary" className="w-full">
            Chamar no <span className="text-primary ml-1">WhatsApp</span>
          </Button>
        </div>
      </div>
    </section>
  </MaxWrapper>
);

export default Page;

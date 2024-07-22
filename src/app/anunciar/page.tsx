import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { announce } from "@/constants/announce";
import Link from "next/link";

export default function Page() {
  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen">
        <Card className="w-full max-w-3xl mx-auto p-4 gap-4">
          <CardHeader className="space-y-1 text-center">
            <CardTitle>O que é AutoNegocie?</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              O AutoNegocie é uma plataforma especializada em negociação de
              veículos, fornecendo uma gama de ferramentas de comunicação e
              recursos de negócios que agilizam o processo de venda do seu
              carro.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {announce.map((item) => (
              <div key={item.title} className="flex gap-4 items-center">
                <div>{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          <Button className="w-full" asChild>
            <Link href="/anunciar/formularios">Anuncie</Link>
          </Button>
        </Card>
      </section>
    </MaxWrapper>
  );
}

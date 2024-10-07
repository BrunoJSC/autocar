import { MaxWrapper } from "@/components/max-wrapper";
import Image from "next/image";

export default function Page() {
  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-8 items-center bg-gray-100">
        <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-lg my-6 mx-auto p-6 gap-6 bg-white shadow-lg border border-gray-200">
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <Image
              src="/icons/roles.svg"
              alt="Regras gerais do site AutoNegocie"
              width={400}
              height={400}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Regras Gerais do Site AutoNegocie
            </h1>

            <p className="text-gray-700 leading-relaxed">
              O site AutoNegocie.com.br oferece exclusivamente um serviço: atua
              meramente como provedor do espaço virtual para os anúncios. Não é
              responsável pela qualidade, proveniência, veracidade e informações
              dos anúncios; como também não se responsabiliza pelas
              consequências diretas ou indiretas que eventualmente possam
              decorrer de informações oferecidas sobre a qualidade, precauções e
              condições de pagamento dos anúncios veiculados no site. Atuamos
              como um intermediário oferecendo conhecimento e expertise para que
              o negócio se concretize de forma saudável, mas cabe ao anunciante
              e ao eventual interessado determinarem as suas relações recíprocas
              sobre as condições de preços, prazo, forma de pagamento, entrega
              do bem e tudo que for inerente à negociação do bem.
            </p>
          </div>
        </div>
      </section>
    </MaxWrapper>
  );
}

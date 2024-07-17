import { HandshakeIcon, MessageSquareIcon, Percent, Plus } from "lucide-react";

export const services = [
  {
    title: "Avaliação",
    description:
      "Avalie seu veículo de forma rápida e segura em nossa plataforma. É importante garantir que esteja bem conservado para analisarmos da melhor forma e chegarmos a um preço justo.",
    icon: <MessageSquareIcon />,
  },
  {
    title: "Negociação",
    description:
      "Em nossa plataforma você terá uma negociação de alta qualidade, te conectamos com o comprador que procura exatamente o que o seu veículo oferece para facilitar todo o processo.",
    icon: <HandshakeIcon />,
  },

  {
    title: "Venda",
    description:
      "Nossa equipe te acompanha e cuida de todos os passos para uma venda simplificada e segura. Tenha a disposição um atendimento qualificado para tirar todas as suas dúvidas das etapas de venda.",
    icon: <Percent />,
  },
  {
    title: "Compra",
    description:
      "Tenha acesso a um catálogo de carros selecionados por nossa equipe com o objetivo de manter a qualidade em tudo que oferecemos a você. Temos preços abaixo do mercado e facilitamos a sua compra através de troca e financiamento.",
    icon: <Plus />,
  },
];

import {
  HandshakeIcon,
  MessageSquareIcon,
  Percent,
  Plus,
  HandCoins,
  SearchCheck,
} from "lucide-react";

export const services = [
  {
    title: "Anuncie Aqui",
    description:
      "Nosso marketing é elaborado com as melhores estratégias da atualidade. Buscamos a atenção de clientes em potencial e criamos conexões para entender suas necessidades. Nosso time de atendimento cuida de todo o processo, desde o primeiro contato até o agendamento da visita.",
    icon: <HandCoins />,
  },
  {
    title: "Compra",
    description:
      "Acesse um catálogo de carros selecionados por nossa equipe para garantir a qualidade em tudo que oferecemos. Facilitamos sua compra através de troca e financiamento, e sempre temos promoções exclusivas e brindes para quem compra através da nossa plataforma.",
    icon: <HandshakeIcon />,
  },

  {
    title: "Negociação",
    description:
      "Temos um time de atendimento dedicado não apenas a vender, mas a entender suas necessidades e oferecer o melhor caminho para uma compra com condições justas e transparentes. Garantimos que você fique 100% satisfeito com sua conquista.",
    icon: <Plus />,
  },
  {
    title: "Avaliação",
    description:
      "Avalie seu veículo de forma rápida e segura em nossa plataforma. É importante garantir que o veículo esteja bem conservado para que possamos analisá-lo da melhor forma e chegar a um preço justo.",
    icon: <SearchCheck />,
  },
];

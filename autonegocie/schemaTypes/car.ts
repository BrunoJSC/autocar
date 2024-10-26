import {defineType, defineField} from 'sanity'

// Tipo de Objeto para Acessórios
export const carType = defineType({
  name: 'car',
  title: 'Carro',
  type: 'document',
  fields: [
    defineField({
      name: 'brandCar',
      title: 'Marca',
      type: 'string',
      options: {
        list: [
          {title: 'Chevrolet', value: 'Chevrolet'},
          {title: 'Fiat', value: 'Fiat'},
          {title: 'Ford', value: 'Ford'},
          {title: 'Hyundai', value: 'Hyundai'},
          {title: 'Nissan', value: 'Nissan'},
          {title: 'Renault', value: 'Renault'},
          {title: 'Volkswagen', value: 'Volkswagen'},
          {title: 'Toyota', value: 'Toyota'},
          {title: 'Peugeot', value: 'Peugeot'},
          {title: 'Citroen', value: 'Citroen'},
          {title: 'Mercedes-Benz', value: 'Mercedes-Benz'},
          {title: 'Bmw', value: 'Bmw'},
          {title: 'Porsche', value: 'Porsche'},
          {title: 'Hyundai', value: 'Hyundai'},
          {title: 'Jeep', value: 'Jeep'},
          {title: 'Volvo', value: 'Volvo'},
          {title: 'Peugeout', value: 'Peugeout'},
          {title: 'Audi', value: 'Audi'},
          {title: 'Jaguar', value: 'Jaguar'},
          {title: 'Chery', value: 'Chery'},
          {title: 'Dodge', value: 'Dodge'},
          {title: 'Ferrari', value: 'Ferrari'},
          {title: 'Lamborghini', value: 'Lamborghini'},
          {title: 'Kia', value: 'Kia'},
          {title: 'Mazda', value: 'Mazda'},
          {title: 'Mitsubishi', value: 'Mitsubishi'},
          {title: 'Subaru', value: 'Subaru'},
          {title: 'Suzuki', value: 'Suzuki'},
          {title: 'Alfa Romeo', value: 'Alfa Romeo'},
          {title: 'Aston Martin', value: 'Aston Martin'},
          {title: 'Maserati', value: 'Maserati'},
          {title: 'Lexus', value: 'Lexus'},
          {title: 'Agrale', value: 'Agrale'},
          {title: 'Bentley', value: 'Bentley'},
          {title: 'Changan', value: 'Changan'},
          {title: 'Chrysler', value: 'Chrysler'},
          {title: 'Dacia', value: 'Dacia'},
          {title: 'Effa', value: 'Effa'},
          {title: 'Geely', value: 'Geely'},
          {title: 'Hafei', value: 'Hafei'},
          {title: 'Iveco', value: 'Iveco'},
          {title: 'JAC Motors', value: 'JAC-Motors'},
          {title: 'Jinbei', value: 'Jinbei'},
          {title: 'Land rover', value: 'Land-Rover'},
          {title: 'Lifan', value: 'Lifan'},
          {title: 'Mini', value: 'Mini'},
          {title: 'Troller', value: 'Troller'},
          {title: 'Smart', value: 'Smart'},
          {title: 'Ssangyong', value: 'Ssangyong'},
          {title: 'Ram', value: 'Ram'},
          {title: 'Honda', value: 'Honda'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelCar',
      title: 'Modelo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'São Paulo', value: 'São paulo'},
          {title: 'São Paulo zona sul', value: 'São paulo zona sul'},
          {title: 'São Paulo zona oeste', value: 'São paulo zona oeste'},
          {title: 'São Paulo zona leste', value: 'São paulo zona leste'},
          {title: 'São Paulo zona norte', value: 'São paulo zona norte'},
          {title: 'São Bernardo do Campo', value: 'São bernardo do campo'},
          {title: 'São Caetano', value: 'São caetano'},
          {title: 'Santo Andre', value: 'Santo andre'},
          {title: 'Ribeirão Pires', value: 'Ribeirão pires'},
          {title: 'Mauá', value: 'Mauá'},
          {title: 'Diadema', value: 'Diadema'},
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Data da publicação',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'yearFabrication',
      title: 'Ano de Fabricação',
      type: 'number',
      options: {
        list: Array.from({length: 50}, (_, i) => {
          const year = new Date().getFullYear() - i
          return {title: year.toString(), value: year}
        }),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearModification',
      title: 'Ano de Modificação',
      type: 'number',
      options: {
        list: Array.from({length: 50}, (_, i) => {
          const year = new Date().getFullYear() - i
          return {title: year.toString(), value: year}
        }),
      },
      validation: (Rule) => Rule.required().min(Rule.valueOfField('yearFabrication')),
    }),

    defineField({
      name: 'fuel',
      title: 'Combustível',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Flex', value: 'flex'},
          {title: 'Gasolina', value: 'gasolina'},
          {title: 'Etanol', value: 'etanol'},
          {title: 'GPL', value: 'gpl'},
          {title: 'Diesel', value: 'diesel'},
          {title: 'Eletrico', value: 'eletrico'},
        ],
      },
    }),
    defineField({
      name: 'km',
      title: 'Quilometragem',
      type: 'number',
    }),
    defineField({
      name: 'exchange',
      title: 'Câmbio',
      type: 'string',
      options: {
        list: [
          {title: 'Automático', value: 'Automático'},
          {title: 'Manual', value: 'Manual'},
          {title: 'Semi automático', value: 'Semi-automático'},
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Cor',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Preto', value: 'preto'},
          {title: 'Branco', value: 'branco'},
          {title: 'Cinza', value: 'cinza'},
          {title: 'Vermelho', value: 'vermelho'},
          {title: 'Azul', value: 'azul'},
          {title: 'Verde', value: 'verde'},
          {title: 'Amarelo', value: 'amarelo'},
          {title: 'Marrom', value: 'marrom'},
          {title: 'Prata', value: 'prata'},
          {title: 'Vinho', value: 'vinho'},
          {title: 'Laranja', value: 'laranja'},
          {title: 'Bege', value: 'bege'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'accessories',
      title: 'Acessórios',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Ar Condicionado', value: 'ar-condicionado'},
          {title: 'Trava Eletrica', value: 'trava eletrica'},
          {title: 'Teto Solar', value: 'teto solar'},
          {title: 'Multimidia', value: 'multimidia'},
          {title: 'Direção Hidraulica', value: 'direção hidraulica'},
          {title: 'Som', value: 'som'},
          {title: 'Blindado', value: 'blindado'},
          {title: 'Retrovisor Elétrico', value: 'retrovisor elétrico'},
          {title: 'Banco de couro', value: 'banco de couro'},
          {title: 'Camera de Ré', value: 'camera de re'},
          {title: 'Vidro eletrico', value: 'vidro eletrico'},
          {title: 'Direção Elétrica', value: 'direção-eletrica'},
          {title: 'Rádio MP3', value: 'radio-mp3'},
          {title: 'Sensor de estacionamento', value: 'sensor-de-estacionamento'},
          {title: 'Rodas de liga leve', value: 'rodas-de-liga-leve'},
          {title: 'Farol de milha', value: 'farol-de-milha'},
          {title: 'Air bag', value: 'air bag'},
          {title: 'Camera de ré', value: 'camera-de-re'},
          {title: 'Controle no volante', value: 'controle-no-volante'},
          {title: 'Alarme', value: 'alarme'},
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
    }),
    defineField({
      name: 'bodyType',
      title: 'Tipo de Carroceria',
      type: 'string',
      options: {
        list: [
          {title: 'Hatch', value: 'hatch'},
          {title: 'Sedan', value: 'sedan'},
          {title: 'SUV', value: 'suv'},
          {title: 'Pickup', value: 'pickup'},
          {title: 'Caminhão', value: 'caminhão'},
          {title: 'Mini Van', value: 'mini van'},
          {title: 'Utilirário', value: 'utilirário'},
        ],
      },
    }),
    defineField({
      name: 'motors',
      title: 'Motor',
      type: 'number',
      options: {
        list: [
          {title: '1.0', value: 1.0},
          {title: '1.2', value: 1.2},
          {title: '1.3', value: 1.3},
          {title: '1.4', value: 1.4},
          {title: '1.5', value: 1.5},
          {title: '1.6', value: 1.6},
          {title: '1.7', value: 1.7},
          {title: '1.8', value: 1.8},
          {title: '2.0', value: 2.0},
          {title: '2.2', value: 2.2},
          {title: '2.4', value: 2.4},
          {title: '3.0', value: 3.0},
        ],
      },
    }),
    defineField({
      name: 'condition',
      title: 'Condição do Carro',
      type: 'string',
      options: {
        list: [
          {title: 'Novo', value: 'novo'},
          {title: 'Usado', value: 'usado'},
          {title: 'Seminovo', value: 'seminovo'},
        ],
      },
    }),
    defineField({
      name: 'announce',
      title: 'Anunciante',
      type: 'string',
      options: {
        list: [
          {title: 'Venda', value: 'venda'},
          {title: 'Aluguel', value: 'aluguel'},
          {title: 'Troca', value: 'troca'},
          {title: 'Financiamento', value: 'financiamento'},
          {title: 'Particular', value: 'particular'},
          {title: 'Loja', value: 'loja'},
        ],
      },
    }),
    defineField({
      name: 'doors',
      title: 'Portas',
      type: 'number',
      options: {
        list: [
          {title: '2', value: 2},
          {title: '3', value: 3},
          {title: '4', value: 4},
          {title: '5', value: 5},
        ],
      },
    }),
    defineField({
      name: 'plate',
      title: 'Placa',
      type: 'string',
    }),

    defineField({
      name: 'store',
      title: 'Loja',
      type: 'string',
      options: {
        list: [
          {title: 'Mavicar', value: 'mavicar'},
          {title: 'GP Car', value: 'gp-car'},
          {title: 'Rhemar', value: 'rhemar'},
        ],
      },
    }),
    defineField({
      title: "Há pendencias?",
      name: "isLate",
      type: "string",
      options: {
        list: [
          {title: "Sim", value: "sim"},
          {title: "Não", value: "não"},
        ]
      }
    })
  ],
})

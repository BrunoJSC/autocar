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
          {title: 'Jaguar', value: 'Jaguar'},
          {title: 'Kia', value: 'kKa'},
          {title: 'Nissan', value: 'Nissan'},
          {title: 'Renault', value: 'Renault'},
          {title: 'Volkswagen', value: 'Volkswagen'},
          {title: 'Toyota', value: 'Toyota'},
          {title: 'Peugeot', value: 'Peugeot'},
          {title: 'Citroen', value: 'Citroen'},
          {title: 'Mercedes-Benz', value: 'Mercedes-Benz'},
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
      name: 'location',
      title: 'Localização',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'São Paulo', value: 'São paulo'},
          {title: 'São Bernardo do Campo', value: 'São bernardo do campo'},
          {title: 'São Caetano', value: 'São caetano'},
          {title: 'Santo Andre', value: 'Santo andre'},
          {title: 'Ribeirão Pires', value: 'Ribeirão pires'},
          {title: 'Mauá', value: 'Mauá'},
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearModification',
      title: 'Ano de Modificação',
      type: 'number',
      validation: (Rule) => Rule.required(),
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
          {title: 'Automático', value: 'automático'},
          {title: 'Manual', value: 'manual'},
          {title: 'Semi Automático', value: 'semi-automático'},
          {title: 'Automático Sequencial', value: 'automático-sequencial'},
          {title: 'Automatizado', value: 'automatizado'},
          {title: 'Automatizado CDT', value: 'automatizado-cdt'},
          {title: 'CVT', value: 'cvt'},
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
          {id: 7, title: 'Blindado', value: 'blindado'},
          {id: 8, title: 'Retrovisor Elétrico', value: 'retrovisor elétrico'},
          {id: 9, title: 'Banco de couro', value: 'banco de couro'},
          {id: 10, title: 'Camera de Ré', value: 'camera de re'},
          {id: 11, title: 'Vidro eletrico', value: 'vidro eletrico'},
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
          {title: '1.3', value: 1.3},
          {title: '1.4', value: 1.4},
          {title: '1.5', value: 1.5},
          {title: '1.6', value: 1.6},
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
  ],
})

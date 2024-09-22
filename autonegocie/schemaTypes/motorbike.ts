import {defineType, defineField} from 'sanity'

export const motorbikeType = defineType({
  name: 'motorbike',
  title: 'Motos',
  type: 'document',
  fields: [
    defineField({
      name: 'motorbikeBrand',
      title: 'Marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Honda', value: 'Honda'},
          {title: 'Yamaha', value: 'Yamaha'},
          {title: 'Kawasaki', value: 'Kawasaki'},
          {title: 'Suzuki', value: 'Suzuki'},
          {title: 'BMW', value: 'Bmw'},
          {title: 'Ducati', value: 'Ducati'},
          {title: 'KTM', value: 'Ktm'},
          {title: 'Harley-Davidson', value: 'Harley-Davidson'},
          {title: 'Triumph', value: 'Triumph'},
          {title: 'Dicati', value: 'Ducati'},
          {title: 'Dafra', value: 'Dafra'},
          {title: 'Haojue', value: 'Haojue'},
          {title: 'Kymco', value: 'Kymco'},
          {title: 'MXF', value: 'MXF'},
          {title: 'Piaggio', value: 'Piaggio'},
          {title: 'Pro Tork', value: 'Pro Tork'},
          {title: 'Royal Enfield', value: 'Royal Enfield'},
          {title: 'Shineray', value: 'Shineray'},
        ],
      },
    }),
    defineField({
      name: 'accessories',
      title: 'Acessórios',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Freio a Disco Dianteiro', value: 'freio a disco'},
          {title: 'Sistema de Partida Elétrica', value: 'partida eletro'},
          {title: 'Freio a Disco Traseiro', value: 'freio a disco traseiro'},
          {title: 'Rodas de Liga Leve', value: 'ligas leves'},
        ],
      },
    }),
    defineField({
      name: 'motorbikeModel',
      title: 'Modelo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
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
      name: 'yearFabrication',
      title: 'Ano de Fabricação',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearModification',
      title: 'Ano de modelo',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'km',
      title: 'Quilometragem',
      type: 'number',
    }),
    defineField({
      name: 'fuel',
      title: 'Combustível',
      type: 'string',
      options: {
        list: [
          {title: 'Flex', value: 'flex'},
          {title: 'Gasolina', value: 'gasolina'},
          {title: 'Etanol', value: 'etanol'},
        ],
      },
    }),
    defineField({
      name: 'cylinders',
      title: 'Cilindrada',
      type: 'number',
      options: {
        list: [
          {title: '125cc', value: 125},
          {title: '250cc', value: 250},
          {title: '300cc', value: 300},
          {title: '350cc', value: 350},
          {title: '400cc', value: 400},
          {title: '450cc', value: 450},
          {title: '500cc', value: 500},
          {title: '550cc', value: 550},
          {title: '600cc', value: 600},
          {title: '650cc', value: 650},
          {title: '700cc', value: 700},
          {title: '750cc', value: 750},
          {title: '800cc', value: 800},
          {title: '850cc', value: 850},
          {title: '900cc', value: 900},
          {title: '950cc', value: 950},
          {title: '1000cc', value: 1000},
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Cor',
      type: 'string',
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
      name: 'images',
      title: 'Imagens',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'announce',
      title: 'Anunciante',
      type: 'string',
      options: {
        list: [
          {title: 'Locado', value: 'locado'},
          {title: 'Particular', value: 'particular'},
          {title: 'Loja', value: 'loja'},
          {title: 'Troca', value: 'troca'},
          {title: 'Aluguel', value: 'aluguel'},
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
    }),
    defineField({
      name: 'condition',
      title: 'Condição da Moto',
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
      name: 'fairing',
      title: 'Carenagem',
      type: 'string',
      options: {
        list: [
          {title: 'Boa', value: 'boa'},
          {title: 'Regular', value: 'regular'},
          {title: 'Ruim', value: 'ruim'},
        ],
      },
    }),
    defineField({
      name: 'plate',
      title: 'Placa',
      type: 'string',
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
      name: 'exchange',
      title: 'Câmbio',
      type: 'string',
      options: {
        list: [
          {title: 'Manual', value: 'manual'},
          {title: 'Automatico', value: 'automatico'},
        ],
      },
    }),
  ],
})

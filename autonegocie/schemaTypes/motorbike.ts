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
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'km',
      title: 'Quilometragem',
      type: 'string',
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
      name: 'cylinder',
      title: 'Cilindrada',
      type: 'string',
      options: {
        list: [
          {title: '125cc', value: '125cc'},
          {title: '250cc', value: '250cc'},
          {title: '300cc', value: '300cc'},
          {title: '350cc', value: '350cc'},
          {title: '400cc', value: '400cc'},
          {title: '450cc', value: '450cc'},
          {title: '500cc', value: '500cc'},
          {title: '550cc', value: '550cc'},
          {title: '600cc', value: '600cc'},
          {title: '650cc', value: '650cc'},
          {title: '700cc', value: '700cc'},
          {title: '750cc', value: '750cc'},
          {title: '800cc', value: '800cc'},
          {title: '850cc', value: '850cc'},
          {title: '900cc', value: '900cc'},
          {title: '950cc', value: '950cc'},
          {title: '1000cc', value: '1000cc'},
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
      name: 'accessories',
      title: 'Acessórios',
      type: 'array',
      of: [{type: 'accessory'}],
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
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
      type: 'string',
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
      name: 'exchange',
      title: 'Câmbio',
      type: 'string',
    }),
  ],
})

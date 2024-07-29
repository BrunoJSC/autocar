import {defineField, defineType} from 'sanity'

export const carFormType = defineType({
  name: 'carForm',
  title: 'Formulário de Carros',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'location',
      type: 'string',
    }),
    defineField({
      name: 'brandCar',
      title: 'Marca',
      type: 'string',
    }),
    defineField({
      name: 'modelCar',
      title: 'Modelo',
      type: 'string',
    }),
    defineField({
      name: 'bodyType',
      title: 'Tipo de carroceria',
      type: 'string',
    }),
    defineField({
      name: 'auction',
      title: 'Leilão',
      type: 'string',
    }),
    defineField({
      name: 'condition',
      title: 'Condição',
      type: 'string',
    }),
    defineField({
      name: 'mechanic',
      title: 'Mecânico',
      type: 'string',
    }),
    defineField({
      name: 'plate',
      title: 'Placa',
      type: 'string',
    }),
    defineField({
      name: 'yearFabrication',
      title: 'Ano de fabricação',
      type: 'string',
    }),
    defineField({
      name: 'yearModification',
      title: 'Ano de modificação',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Cor',
      type: 'string',
    }),
    defineField({
      name: 'exchange',
      title: 'Cambio',
      type: 'string',
    }),
    defineField({
      name: 'doors',
      title: 'Portas',
      type: 'string',
    }),
    defineField({
      name: 'km',
      title: 'Quilometragem',
      type: 'number',
    }),
    defineField({
      name: 'motors',
      title: 'Motor',
      type: 'string',
    }),
    defineField({
      name: 'bodywork',
      title: 'Lataria',
      type: 'string',
    }),
    defineField({
      name: 'document',
      title: 'Documentos',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
    }),
    defineField({
      name: 'accessories',
      title: 'Acessórios',
      type: 'array',
      of: [{type: 'string'}],
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
      of: [{type: 'image'}],
    }),
  ],
})

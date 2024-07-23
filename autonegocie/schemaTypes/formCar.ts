import {defineField, defineType} from 'sanity'

export const carFormType = defineType({
  name: 'carForm',
  title: 'Formulário de Carros',
  type: 'document',

  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
    }),
  ],
})

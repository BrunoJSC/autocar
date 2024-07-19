import {defineField, defineType} from 'sanity'

export const storeType = defineType({
  name: 'store',
  title: 'Lojas',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locationUrl',
      title: 'Url',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
  ],
})

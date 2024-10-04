import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'autonegocie',

  projectId: '0fx6q659',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media(), muxInput()],

  schema: {
    types: schemaTypes,
  },
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'productivitytech',
  title: 'ProductivityTech.io',
  projectId: 'g3aw9p5p',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})


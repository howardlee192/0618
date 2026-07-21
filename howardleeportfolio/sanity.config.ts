import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'howardleeportfolio',

  projectId: 'fmy8qr0r',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      const { document } = context;
      if (document._type === 'project' && document.slug) {
        const slug = (document.slug as any).current;
        if (!slug) return prev;
        
        // Return localhost url for development. 
        // In the future, this can be an environment variable.
        return `http://localhost:5173/project/${slug}?preview=true`;
      }
      return prev;
    },
  },
})

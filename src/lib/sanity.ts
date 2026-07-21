import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'fmy8qr0r',
  dataset: 'production',
  useCdn: false, // Set to false so you can see published changes immediately
  apiVersion: '2024-01-01',
})

export const previewClient = createClient({
  projectId: 'fmy8qr0r',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: (import.meta as any).env.DEV ? (import.meta as any).env.VITE_SANITY_TOKEN : undefined,
  perspective: 'previewDrafts',
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

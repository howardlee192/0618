import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'fmy8qr0r',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const query = `*[_type == "project" && slug.current == $slug][0]{
  ...,
  coverVideoFile { asset->url },
  contentBlocks[] {
    ...,
    _type == 'masonryGridBlock' => {
      ...,
      mediaItems[] {
        ...,
        videoFile { asset->url }
      }
    }
  }
}`;

const slugToFetch = process.argv[2] || "123";

client.fetch(query, { slug: slugToFetch })
  .then(data => console.log('Fetch result:', data))
  .catch(err => console.error('Fetch error:', err.message))

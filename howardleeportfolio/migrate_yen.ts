import { getCliClient } from 'sanity/cli'
import * as crypto from 'crypto'

const client = getCliClient()
const key = () => crypto.randomBytes(4).toString('hex')

async function migrateYen() {
  const doc = await client.fetch(`*[_type == "project" && slug.current == "thesis-sketching"][0]`);
  if (!doc) {
    console.log("No thesis-sketching found.");
    return;
  }
  
  // Extract images from masonryGridBlock
  let images = [];
  if (doc.contentBlocks) {
    for (const block of doc.contentBlocks) {
      if (block._type === 'masonryGridBlock' && block.mediaItems) {
        images = block.mediaItems.filter(i => i.type === 'image' && i.image).map(i => i.image);
      }
    }
  }
  
  // Actually, wait, ProjectYen used drawing4cover.jpg, and drawing1-4.
  // The original images were: drawing4cover, drawing1, drawing2, drawing3, drawing4
  // Let's get ALL images associated with this project.
  const allRefs = [doc.coverImage?.asset?._ref, ...images.map(i => i.asset?._ref)].filter(Boolean);
  const resolved = await client.fetch(`*[_id in $refs]{_id, originalFilename}`, { refs: allRefs });
  
  const imgByName = {};
  for (const asset of resolved) {
    if (asset.originalFilename) {
      const name = asset.originalFilename.split('.')[0];
      imgByName[name] = { _type: 'image', asset: { _ref: asset._id } };
    }
  }
  
  const coverImg = imgByName['drawing4cover'];
  const drawing1 = imgByName['drawing1'];
  const drawing2 = imgByName['drawing2'];
  const drawing3 = imgByName['drawing3'];
  const drawing4 = imgByName['drawing4'];
  
  const slideshowImages = [];
  if (coverImg) slideshowImages.push(coverImg);
  if (drawing1) slideshowImages.push(drawing1);
  if (drawing2) slideshowImages.push(drawing2);
  if (drawing3) slideshowImages.push(drawing3);
  if (drawing4) slideshowImages.push(drawing4);
  
  const newBlocks = [
    {
      _key: key(),
      _type: 'slideshowBlock',
      images: slideshowImages
    },
    {
      _key: key(),
      _type: 'separatorBlock',
      en: 'Sketches',
      zh: '素描作品',
      style: 'left-aligned'
    },
    {
      _key: key(),
      _type: 'standardGridBlock',
      columns: 2,
      mediaItems: [
        { _key: key(), type: 'image', image: drawing1, span2: true },
        { _key: key(), type: 'image', image: drawing2, span2: false },
        { _key: key(), type: 'image', image: drawing3, span2: false },
        { _key: key(), type: 'image', image: drawing4, span2: true }
      ].filter(i => i.image)
    }
  ];
  
  await client.patch(doc._id).set({ contentBlocks: newBlocks }).commit();
  console.log("Successfully migrated thesis-sketching!");
}

migrateYen();

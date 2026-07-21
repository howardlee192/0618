// @ts-nocheck
import { getCliClient } from 'sanity/cli'
import * as crypto from 'crypto'

const client = getCliClient()

const key = () => crypto.randomBytes(4).toString('hex')

const LAYOUT_MAPPING = {
  'unsorted': [
    { type: 'standardGridBlock', columns: 1, items: [{ url: 'https://www.youtube.com/embed/59k37VQ5rKo?autoplay=1&vq=hd1080', type: 'videoUrl' }] },
    { type: 'standardGridBlock', columns: 2, items: [
      { name: 'highlight1', span2: true }, { name: 'highlight2' }, { name: 'highlight3' }
    ]},
    { type: 'separatorBlock', en: 'Process', zh: 'Process', style: 'centered' },
    { type: 'masonryGridBlock', columns: 3, items: [
      { name: 'process1' }, { name: 'process4' }, { name: 'process3' }, { name: 'process5' }, { name: 'process2' }, { name: 'process6' }
    ]},
    { type: 'standardGridBlock', columns: 1, items: [{ name: 'unsorted_cover' }]}
  ],
  'frame-by-frame': [
    { type: 'standardGridBlock', columns: 2, items: [{ name: 'highlight1' }, { name: 'highlight2' }] },
    { type: 'separatorBlock', en: 'Main Process', zh: '製作過程', style: 'centered' },
    { type: 'masonryGridBlock', columns: 3, items: [
      { name: 'mainprocess' }, { name: 'mainprocess2' }, { name: 'mainprocess3' }, { name: 'mainprocess4' }
    ]},
    { type: 'separatorBlock', en: 'Ideation & Alternatives', zh: '發想與棄案', style: 'centered' },
    { type: 'masonryGridBlock', columns: 3, items: [
      { name: 'secondprocess1' }, { name: 'secondprocess2' }, { name: 'sceondprocess3' }, { name: 'secondprocess4' }, { name: 'secondprocess5' }, { name: 'secondprocess6' }, { name: 'secondprocess7' }, { name: 'sceondprocess8' }
    ]}
  ],
  'who-decides': [
    { type: 'standardGridBlock', columns: 1, items: [{ name: 'Poster2' }, { name: 'Poster3' }] },
    { type: 'separatorBlock', en: 'Material & Form Exploration', zh: '議題關係媒材&形式探索', style: 'centered' },
    { type: 'masonryGridBlock', columns: 3, items: [
      { name: 'MainProcessCover' }, { name: 'Mainprocess1' }, { name: 'Mainprocess2' }, { name: 'Mainprocess3' }, { name: 'Mainprocess4' }
    ]},
    { type: 'separatorBlock', en: 'Ideation & Process', zh: '發想與紀錄', style: 'centered' },
    { type: 'masonryGridBlock', columns: 3, items: [
      { name: 'Process1' }, { name: 'Process2' }, { name: 'Process3' }, { name: 'Process4' }, { name: 'Process5' }, { name: 'Process6' }, { name: 'Process7' }, { name: 'IG record1' }, { name: 'IG record2' }
    ]}
  ],
  'bamboo': [
    { type: 'separatorBlock', en: 'Visual Elements & Process', zh: '視覺元素與過程', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: 'realscene1' }, { name: 'realscene2' }, { name: 'realscene3' }, { name: 'realscene4' }, { name: 'realscene5' }, { name: 'realscene7' }, { name: 'process1' }, { name: 'process2' }, { name: 'process3' }
    ]}
  ],
  'thesis-sketching': [
    { type: 'separatorBlock', en: 'Sketches', zh: '素描作品', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: 'drawing1' }, { name: 'drawing2' }, { name: 'drawing3' }, { name: 'drawing4' }
    ]}
  ],
  'endowing': [
    { type: 'separatorBlock', en: 'Zine Pages', zh: '內頁設計', style: 'left-aligned' },
    { type: 'standardGridBlock', columns: 2, items: [
      { name: 'book1', span2: true }, { name: 'book2' }, { name: 'book3' }, { name: 'book4', span2: true }, { name: 'book5' }, { name: 'book6' }
    ]}
  ],
  'culture-identity': [
    { type: 'separatorBlock', en: 'Zine Pages', zh: '內頁設計', style: 'left-aligned' },
    { type: 'standardGridBlock', columns: 2, items: [
      { name: 'book1', span2: true }, { name: 'book2' }, { name: 'book3' }, { name: 'book4', span2: true }, { name: 'book5' }, { name: 'book6' }, { name: 'book7' }, { name: 'book8' }
    ]}
  ],
  'digital-twin': [
    { type: 'separatorBlock', en: 'Visual Elements', zh: '視覺元素', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: '2_igpost front4.5' }, { name: '3_igpost left4.5' }, { name: '4_igpost angle45_4.5_cover' }, { name: '7_igpost glassesloop' }, { name: '8_glassesfit' }, { name: '9_1_databar-v' }, { name: '9_2_databar' }, { name: '10_brain' }, { name: '11_1_backlight' }, { name: '11_2_backlight' }, { name: '12_face' }, { name: 'record' }
    ]}
  ],
  'happy-horse': [
    { type: 'separatorBlock', en: 'Visual Elements', zh: '視覺元素', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: 'horseig02' }, { name: 'horseig03' }, { name: 'horseig04' }
    ]}
  ],
  'life-drawing': [
    { type: 'separatorBlock', en: 'Sketches & Process', zh: '素描作品與過程', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: 'drawing01' }, { name: 'drawing03' }, { name: 'drawing04' }, { name: 'record1' }, { name: 'record2' }, { name: 'record3' }, { name: 'record4' }
    ]}
  ],
  'egggy-planet': [
    { type: 'standardGridBlock', columns: 1, items: [{ url: 'https://www.youtube.com/embed/T3Eu52dw9Mk?autoplay=1&vq=hd1080', type: 'videoUrl' }] },
    { type: 'standardGridBlock', columns: 2, items: [
      { name: 'highlightcover', span2: true }, { name: 'highlight1' }, { name: 'highlight2' }, { name: 'highlight3' }, { name: 'highlight4' }
    ]},
    { type: 'separatorBlock', en: 'Gallery & Process', zh: '作品與過程', style: 'left-aligned' },
    { type: 'masonryGridBlock', columns: 2, items: [
      { name: 'process1' }, { name: 'process2' }, { name: 'process3' }, { name: 'process4' }
    ]}
  ]
};

async function migrateLayouts() {
  console.log('Fetching all projects...');
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    slug,
    contentBlocks
  }`);

  for (const doc of projects) {
    const slug = doc.slug?.current;
    if (!slug || !LAYOUT_MAPPING[slug]) continue;
    
    console.log(`\nProcessing ${slug}...`);
    
    // Extract all media items currently stored in the document
    const allMedia = [];
    if (doc.contentBlocks) {
      for (const block of doc.contentBlocks) {
        if (block.mediaItems) {
          allMedia.push(...block.mediaItems);
        }
      }
    }
    
    if (allMedia.length === 0) {
      console.log(`No media found in document blocks for ${slug}. Skipping.`);
      continue;
    }
    
    // Resolve original filenames for all media items
    const refs = allMedia.map(m => m.image?.asset?._ref || m.videoFile?.asset?._ref).filter(Boolean);
    const resolvedAssets = await client.fetch(`*[_id in $refs]{_id, originalFilename}`, { refs });
    
    // Build a map of name -> mediaItem object
    const mediaByName = {};
    for (const item of allMedia) {
      const ref = item.image?.asset?._ref || item.videoFile?.asset?._ref;
      if (ref) {
        const asset = resolvedAssets.find(a => a._id === ref);
        if (asset && asset.originalFilename) {
          // match name without extension
          const name = asset.originalFilename.split('.')[0];
          mediaByName[name] = item;
        }
      }
    }
    
    const layout = LAYOUT_MAPPING[slug];
    const newBlocks = [];
    
    for (const blockDef of layout) {
      if (blockDef.type === 'separatorBlock') {
        newBlocks.push({
          _key: key(),
          _type: 'separatorBlock',
          en: blockDef.en,
          zh: blockDef.zh,
          style: blockDef.style
        });
      } else {
        const mediaItems = [];
        for (const itemDef of blockDef.items) {
          if (itemDef.type === 'videoUrl') {
            mediaItems.push({
              _key: key(),
              type: 'videoUrl',
              videoUrl: itemDef.url,
              span2: itemDef.span2 || false
            });
          } else if (itemDef.name) {
            // Find by exact match or partial match
            let found = mediaByName[itemDef.name];
            if (!found) {
              const possibleName = Object.keys(mediaByName).find(n => n.includes(itemDef.name) || itemDef.name.includes(n));
              if (possibleName) {
                found = mediaByName[possibleName];
              }
            }
            
            if (found) {
              mediaItems.push({
                _key: key(),
                type: found.type,
                image: found.image,
                videoFile: found.videoFile,
                span2: itemDef.span2 || false
              });
            } else {
              console.warn(`Could not find image for ${itemDef.name} in ${slug}`);
            }
          }
        }
        
        if (mediaItems.length > 0) {
          newBlocks.push({
            _key: key(),
            _type: blockDef.type,
            columns: blockDef.columns || 2,
            mediaItems
          });
        }
      }
    }
    
    // Commit the new blocks
    try {
      await client.patch(doc._id).set({ contentBlocks: newBlocks }).commit();
      console.log(`Successfully updated layout for ${slug}`);
    } catch (e) {
      console.error(`Failed to update ${slug}`, e.message);
    }
  }
}

migrateLayouts();

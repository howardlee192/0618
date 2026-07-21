// @ts-nocheck
import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

// We use the CLI client which automatically inherits the user's token!
const client = getCliClient()

const __dirname = path.resolve(process.cwd(), '..') // Because we run inside howardleeportfolio

const PROJECTS_DATA = [
  {
    id: "unsorted",
    title: { en: "Unsorted", cn: "Unsorted" },
    year: "2026",
    mediums: ["AUDIO VISUAL", "INSTALLATION"],
    coverFile: "unsorted_cover.jpg",
    className: ""
  },
  {
    id: "frame-by-frame",
    title: { en: "Frame by Frame", cn: "Frame by Frame" },
    year: "2025",
    mediums: ["INSTALLATION", "3D"],
    coverFile: "cover.jpg",
    className: ""
  },
  {
    id: "who-decides",
    title: { en: "Who decides your needs?", cn: "Who decides your needs?" },
    year: "2026",
    mediums: ["GRAPHIC DESIGN"],
    coverFile: "Postercoverloop.mp4",
    className: "md:row-span-2 h-full"
  },
  {
    id: "egggy-planet",
    title: { en: "Eggbys Planet", cn: "蛋寶星球記" },
    year: "2025",
    mediums: ["MIXED MEDIA", "EXPERIMENTAL"],
    coverFile: "cover.jpg",
    className: "md:col-span-2"
  },
  {
    id: "bamboo",
    title: { en: "Cantonese Bamboo Theatre", cn: "神功戲棚" },
    year: "2026",
    mediums: ["GRAPHIC DESIGN"],
    coverFile: "poster_cover.jpg",
    className: "md:row-span-2 h-full"
  },
  {
    id: "thesis-sketching",
    title: { en: "Architectural Thesis Drawing", cn: "2026實踐建築系畢製作品素描" },
    year: "2026",
    mediums: ["DRAWING"],
    coverFile: "drawing4cover.jpg",
    folder: "yen",
    className: ""
  },
  {
    id: "endowing",
    title: { en: "The Endowing of Objects", cn: "物體的賦予" },
    year: "2026",
    mediums: ["EDITORIAL DESIGN"],
    coverFile: "book_cover.jpg",
    className: ""
  },
  {
    id: "culture-identity",
    title: { en: "Culture_Identity_Boundary", cn: "文化_身分_邊界" },
    year: "2026",
    mediums: ["EDITORIAL DESIGN"],
    coverFile: "book_cover.jpg",
    folder: "culture",
    className: ""
  },
  {
    id: "digital-twin",
    title: { en: "Digital Twin", cn: "數位孿生" },
    year: "2025",
    mediums: ["3D"],
    coverFile: "1_igpost loop8s.mp4",
    folder: "gear",
    className: "md:row-span-2 h-full"
  },
  {
    id: "happy-horse",
    title: { en: "Happy Horse Year 2026", cn: "2026馬力全開" },
    year: "2026",
    mediums: ["3D"],
    coverFile: "horseig01.mp4",
    folder: "horseyear",
    className: "md:row-span-2 h-full"
  },
  {
    id: "life-drawing",
    title: { en: "Life Drawing", cn: "人體素描" },
    year: "2025",
    mediums: ["DRAWING"],
    coverFile: "drawing02.jpg",
    folder: "drawing",
    className: ""
  }
];

async function uploadAsset(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const isVideo = ext === '.mp4' || ext === '.webm';
  const assetType = isVideo ? 'file' : 'image';
  
  console.log(`Uploading ${path.basename(filePath)}...`);
  try {
    const asset = await client.assets.upload(assetType, fs.createReadStream(filePath), {
      filename: path.basename(filePath)
    });
    return { asset, isVideo };
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log('Starting migration...');
  
  for (const proj of PROJECTS_DATA) {
    console.log(`\n--- Migrating Project: ${proj.title.en} ---`);
    const folderName = proj.folder || proj.id.replace(/-/g, '');
    let actualFolder = folderName;
    
    if (proj.id === 'frame-by-frame') actualFolder = 'framebyframe';
    else if (proj.id === 'who-decides') actualFolder = 'whodecides';
    else if (proj.id === 'egggy-planet') actualFolder = 'eggplanet';
    else if (proj.id === 'bamboo') actualFolder = 'bamboo';
    
    const dirPath = path.join(__dirname, 'public', 'projects', actualFolder);
    
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory not found: ${dirPath}`);
      continue;
    }
    
    const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
    
    let coverAssetRef = null;
    let coverType = 'image';
    const mediaItems = [];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const uploaded = await uploadAsset(filePath);
      
      if (!uploaded) continue;
      
      if (file === proj.coverFile) {
        coverAssetRef = uploaded.asset._id;
        coverType = uploaded.isVideo ? 'videoFile' : 'image';
      } else {
        mediaItems.push({
          _key: Math.random().toString(36).substring(7),
          type: uploaded.isVideo ? 'videoFile' : 'image',
          span2: false,
          image: !uploaded.isVideo ? { _type: 'image', asset: { _ref: uploaded.asset._id, _type: 'reference' } } : undefined,
          videoFile: uploaded.isVideo ? { _type: 'file', asset: { _ref: uploaded.asset._id, _type: 'reference' } } : undefined
        });
      }
    }
    
    if (!coverAssetRef && files.length > 0) {
       const firstFile = files[0];
       const filePath = path.join(dirPath, firstFile);
       const uploaded = await uploadAsset(filePath);
       if (uploaded) {
         coverAssetRef = uploaded.asset._id;
         coverType = uploaded.isVideo ? 'videoFile' : 'image';
       }
    }
    
    let thumbnailSize = 'normal';
    if (proj.className.includes('row-span-2')) thumbnailSize = 'tall';
    if (proj.className.includes('col-span-2')) thumbnailSize = 'wide';
    
    const doc = {
      _type: 'project',
      title: proj.title.en,
      titleZh: proj.title.cn,
      slug: { _type: 'slug', current: proj.id },
      category: 'personal',
      year: proj.year,
      medium: { en: proj.mediums.join(', '), zh: proj.mediums.join(', ') },
      thumbnailSize,
      coverType,
      coverImage: coverType === 'image' && coverAssetRef ? {
        _type: 'image',
        asset: { _ref: coverAssetRef, _type: 'reference' }
      } : undefined,
      coverVideoFile: coverType === 'videoFile' && coverAssetRef ? {
        _type: 'file',
        asset: { _ref: coverAssetRef, _type: 'reference' }
      } : undefined,
      contentBlocks: [
        {
          _type: 'masonryGridBlock',
          _key: Math.random().toString(36).substring(7),
          columns: 2,
          mediaItems: mediaItems.filter(item => item.type === 'image' || item.type === 'videoFile')
        }
      ]
    };
    
    Object.keys(doc).forEach(key => doc[key] === undefined && delete doc[key]);
    
    try {
      const created = await client.create(doc);
      console.log(`Created document for ${proj.title.en}: ${created._id}`);
    } catch (err) {
      console.error(`Failed to create document for ${proj.title.en}:`, err.message);
    }
  }
  console.log('Migration complete!');
}

migrate();

import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const client = getCliClient();

async function uploadAsset(filePath: string, type: 'image' | 'file') {
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload(type, stream as any, {
      filename: path.basename(filePath),
    });
    console.log(`Uploaded ${type}: ${filePath}`);
    return asset;
  } catch (err) {
    console.error(`Failed to upload ${filePath}`, err);
    throw err;
  }
}

async function migrate() {
  const publicDir = path.resolve('../public');

  const highlightConfigs = [
    {
      word: 'VISUAL',
      mediaType: 'slideshow',
      slideshowSpeed: 0.6,
      localPaths: [
        '/homehighlights/1.Visual/jumphigh1.jpg',
        '/homehighlights/1.Visual/jumphigh2.jpg',
        '/homehighlights/1.Visual/jumphigh3.jpg',
        '/homehighlights/1.Visual/jumphigh4.jpg',
        '/homehighlights/1.Visual/jumphigh5.jpg',
      ],
    },
    {
      word: 'MOTION',
      mediaType: 'video',
      localPath: '/homehighlights/2.Motion/journeyhighlightloop.mp4',
    },
    {
      word: 'ANIMATION',
      mediaType: 'video',
      localPath: '/homehighlights/3.Animation/slavehighlightanimation.mp4',
    },
    {
      word: 'INTERACTION',
      mediaType: 'video',
      localPath: '/homehighlights/4.Interaction/worthhighlightvideo.mp4',
    },
    {
      word: 'PERSONAL',
      mediaType: 'slideshow',
      slideshowSpeed: 0.8,
      localPaths: [
        '/projects/unsorted/unsorted_cover.jpg',
        '/projects/unsorted/highlight1.jpg',
        '/projects/unsorted/highlight2.jpg',
        '/projects/unsorted/highlight3.jpg',
      ],
    },
    {
      word: 'HONG KONG',
      mediaType: 'slideshow',
      slideshowSpeed: 0.4,
      localPaths: [
        '/homehighlights/6.HongKong/1.jpg',
        '/homehighlights/6.HongKong/2.jpg',
        '/homehighlights/6.HongKong/3.jpg',
        '/homehighlights/6.HongKong/4.jpg',
        '/homehighlights/6.HongKong/5.jpg',
        '/homehighlights/6.HongKong/6.jpg',
        '/homehighlights/6.HongKong/7.jpg',
        '/homehighlights/6.HongKong/8.jpg',
        '/homehighlights/6.HongKong/9.jpg',
      ],
    },
    {
      word: 'TAIWAN',
      mediaType: 'slideshow',
      slideshowSpeed: 0.4,
      localPaths: [
        '/homehighlights/7.taiwan/1.jpg',
        '/homehighlights/7.taiwan/2.jpg',
        '/homehighlights/7.taiwan/3.jpg',
        '/homehighlights/7.taiwan/4.jpg',
        '/homehighlights/7.taiwan/5.jpg',
        '/homehighlights/7.taiwan/6.jpg',
        '/homehighlights/7.taiwan/7.jpg',
      ],
    }
  ];

  const highlights = [];

  for (const config of highlightConfigs) {
    const item: any = {
      _key: uuidv4(),
      word: config.word,
      mediaType: config.mediaType,
    };

    if (config.mediaType === 'slideshow' && config.localPaths) {
      item.slideshowSpeed = config.slideshowSpeed;
      item.images = [];
      for (const p of config.localPaths) {
        const fullPath = path.join(publicDir, p);
        if (fs.existsSync(fullPath)) {
          const asset = await uploadAsset(fullPath, 'image');
          item.images.push({
            _key: uuidv4(),
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          });
        } else {
          console.error(`File not found: ${fullPath}`);
        }
      }
    } else if (config.mediaType === 'video' && config.localPath) {
      const fullPath = path.join(publicDir, config.localPath);
      if (fs.existsSync(fullPath)) {
        const asset = await uploadAsset(fullPath, 'file');
        item.videoFile = {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          }
        };
      } else {
        console.error(`File not found: ${fullPath}`);
      }
    }

    highlights.push(item);
  }

  // Update the home document
  console.log("Fetching home document...");
  const homeDoc = await client.fetch(`*[_type == "home"][0]`);
  
  if (!homeDoc) {
    console.log("No home document found, creating one...");
    await client.create({
      _type: 'home',
      highlights
    });
  } else {
    console.log("Updating existing home document...");
    await client.patch(homeDoc._id)
      .set({ highlights })
      .commit();
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);

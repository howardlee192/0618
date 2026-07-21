// @ts-nocheck
import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

const client = getCliClient()
const __dirname = path.resolve(process.cwd(), '..')

const extractedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted.json'), 'utf8'));

// Manually add the missing award for Unsorted
extractedData['ProjectUnsorted.tsx'].awards = {
  en: 'Tung Ming Award, 24th Digital Content Competition, Shih Chien University\nJury Award by Artist Yu Cheng-Ta',
  zh: '實踐大學第24屆東閔盃數位內容競賽\n評審獎 藝術家余政達'
};

const mapFileToSlug = {
  'ProjectUnsorted.tsx': 'unsorted',
  'ProjectFrameByFrame.tsx': 'frame-by-frame',
  'ProjectWhoDecides.tsx': 'who-decides',
  'ProjectEggplanet.tsx': 'egggy-planet',
  'ProjectBamboo.tsx': 'bamboo',
  'ProjectYen.tsx': 'thesis-sketching',
  'ProjectEndowing.tsx': 'endowing',
  'ProjectCulture.tsx': 'culture-identity',
  'ProjectGear.tsx': 'digital-twin',
  'ProjectHorse.tsx': 'happy-horse',
  'ProjectDrawing.tsx': 'life-drawing'
};

async function updateTexts() {
  console.log('Starting text update...');
  for (const [file, data] of Object.entries(extractedData)) {
    const slug = mapFileToSlug[file];
    if (!slug) continue;
    
    // Find document by slug
    const query = `*[_type == "project" && slug.current == "${slug}"][0]._id`;
    const docId = await client.fetch(query);
    
    if (docId) {
      console.log(`Updating ${slug} (${docId})...`);
      
      const patch = client.patch(docId);
      
      if (data.materials) {
        patch.set({ materials: { en: data.materials.en, zh: data.materials.zh } });
      }
      
      if (data.course) {
        patch.set({ course: { en: data.course.en, zh: data.course.zh }, hasCourse: true });
      } else {
        patch.set({ hasCourse: false });
      }
      
      if (data.awards) {
        patch.set({ awards: { en: data.awards.en, zh: data.awards.zh } });
      }
      
      if (data.description) {
        patch.set({ description: { en: data.description.en, zh: data.description.zh } });
      }
      
      await patch.commit();
      console.log(`Successfully updated ${slug}`);
    } else {
      console.warn(`Could not find document for slug: ${slug}`);
    }
  }
  console.log('Text update complete!');
}

updateTexts();

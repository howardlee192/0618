import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const translationMap: Record<string, string> = {
  'ALL': '全部', 
  'CGI': 'CGI', 
  '3D': '3D', 
  'SIMULATION': '物理模擬', 
  'EXPERIMENTAL': '實驗影像', 
  'PHYSICAL': '實體裝置', 
  'MIXED MEDIA': '複合媒材', 
  'GRAPHIC DESIGN': '平面設計', 
  'EDITORIAL DESIGN': '圖文設計', 
  'DRAWING': '素描', 
  'AUDIO VISUAL': '音像演出', 
  'INSTALLATION': '裝置作品'
};

function translateMedium(enString: string): string {
  if (!enString) return '';
  const tags = enString.split(/[,/]/).map(t => t.trim());
  const translatedTags = tags.map(tag => translationMap[tag.toUpperCase()] || tag);
  return translatedTags.join(', ');
}

async function updateMediums() {
  const query = `*[_type == "project"]{_id, medium}`;
  const projects = await client.fetch(query);
  
  for (const project of projects) {
    if (project.medium?.en) {
      const translated = translateMedium(project.medium.en);
      if (project.medium.zh !== translated) {
        console.log(`Updating ${project._id}: ${project.medium.zh} -> ${translated}`);
        await client.patch(project._id)
          .set({ 'medium.zh': translated })
          .commit();
      }
    }
  }
  
  console.log('Finished updating mediums.');
}

updateMediums().catch(console.error);

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const fullWidthProjects = ['unsorted', 'frame-by-frame', 'who-decides', 'egggy-planet'];
const splitProjects = ['bamboo', 'thesis-sketching', 'endowing', 'culture-identity', 'digital-twin', 'happy-horse', 'life-drawing'];

async function updateLayoutStyles() {
  console.log('Fetching all projects...');
  const projects = await client.fetch(`*[_type == "project"]{_id, slug}`);
  
  for (const doc of projects) {
    if (!doc.slug?.current) continue;
    const slug = doc.slug.current;
    
    let style = 'fullWidth';
    if (splitProjects.includes(slug)) {
      style = 'split';
    } else if (fullWidthProjects.includes(slug)) {
      style = 'fullWidth';
    }
    
    try {
      await client.patch(doc._id).set({ layoutStyle: style }).commit();
      console.log(`Updated ${slug} to ${style}`);
    } catch (e: any) {
      console.error(`Failed to update ${slug}: ${e.message}`);
    }
  }
}

updateLayoutStyles();

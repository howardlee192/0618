import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrate() {
  try {
    const slugs = [
      'unsorted',
      'digital-twin',
      'endowing-objects',
      'thesis-sketching',
      'who-decides'
    ];

    const projectDocs = await client.fetch(`*[_type == "project" && slug.current in $slugs]{_id, slug}`, { slugs });
    
    // Sort them in the exact order
    const orderedIds = slugs.map(slug => {
      const p = projectDocs.find((doc: any) => doc.slug.current === slug);
      return p ? p._id : null;
    }).filter(id => id !== null);

    console.log("Found project IDs:", orderedIds);

    const doc = {
      _id: 'homePage',
      _type: 'home',
      featuredProjects: orderedIds.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: Math.random().toString(36).substring(7) // Simple unique key
      }))
    };

    const result = await client.createOrReplace(doc);
    console.log('Migration successful:', result._id);
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function main() {
  console.log('Fetching projects with mediumLabel...');
  const docs = await client.fetch(`*[_type == "project" && defined(mediumLabel)]`);
  
  if (docs.length === 0) {
    console.log('No documents found with mediumLabel.');
    return;
  }

  console.log(`Found ${docs.length} documents. Removing mediumLabel...`);

  let transaction = client.transaction();
  let count = 0;

  for (const doc of docs) {
    transaction.patch(doc._id, (p) => p.unset(['mediumLabel']));
    count++;

    if (count % 50 === 0) {
      await transaction.commit();
      console.log(`Committed ${count} updates...`);
      transaction = client.transaction();
    }
  }

  if (count % 50 !== 0) {
    await transaction.commit();
    console.log(`Committed remaining updates...`);
  }

  console.log('Done!');
}

main().catch(console.error);

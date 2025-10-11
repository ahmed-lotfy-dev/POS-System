import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const uri =
  'mongodb+srv://elshenawy19:sevmH99lt27huXTN@cluster0.j5s5gux.mongodb.net/pos-system?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function exportAllCollections() {
  try {
    await client.connect();
    const db = client.db('pos-system');
    const collections = await db.listCollections().toArray();

    const backupDir = path.resolve('./backup');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

    for (const { name } of collections) {
      const data = await db.collection(name).find().toArray();
      const filePath = path.join(backupDir, `${name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Exported ${name}.json (${data.length} documents)`);
    }

    console.log('\n🎉 All collections exported successfully!');
  } catch (err) {
    console.error('❌ Error exporting collections:', err);
  } finally {
    await client.close();
  }
}

exportAllCollections();

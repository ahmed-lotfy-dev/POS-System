import { PrismaClient } from '@prisma/client';

// ✅ Import your data directly
import users from './data/users.js';
import categories from './data/categories.js';
import units from './data/units.js';
import products from './data/products.js';
import orders from './data/orders.js';
import order_items from './data/order_items.js';

const prisma = new PrismaClient();

const dataMap = {
  user: users,
  category: categories,
  unit: units,
  product: products,
  order: orders,
  orderItem: order_items,
};

// Define the seeding order for relational integrity
const seedOrder = ['user', 'category', 'unit', 'product', 'order', 'orderItem'];

async function main() {
  console.log('🚀 Starting Prisma seeding...');

  for (const modelName of seedOrder) {
    const model = (prisma as any)[modelName];
    const records = dataMap[modelName];

    // Check if the table already has data
    const count = await model.count();
    if (count > 0) {
      console.log(`✅ Model ${modelName} is already seeded. Skipping.`);
      continue;
    }

    if (!records?.length) {
      console.warn(`⚠️ No data found for model: ${modelName}`);
      continue;
    }

    console.log(`🌱 Seeding ${modelName} (${records.length} records)...`);

    try {
      await model.createMany({
        data: records,
        skipDuplicates: true,
      });
    } catch (err: any) {
      console.error(`❌ Error seeding ${modelName}: ${err.message}`);
      console.log('Trying one-by-one insertion...');
      for (const record of records) {
        try {
          await model.create({ data: record });
        } catch (e: any) {
          console.warn(`⚠️ Skipped record due to error: ${e.message}`);
        }
      }
    }
  }

  console.log('✅ All data seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error('❌ Seeding failed:', err);
    await prisma.$disconnect();
    process.exit(1);
  });

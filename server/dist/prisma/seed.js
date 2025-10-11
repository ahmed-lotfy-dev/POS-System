"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const users_js_1 = require("./data/users.js");
const categories_js_1 = require("./data/categories.js");
const units_js_1 = require("./data/units.js");
const products_js_1 = require("./data/products.js");
const orders_js_1 = require("./data/orders.js");
const order_items_js_1 = require("./data/order_items.js");
const prisma = new client_1.PrismaClient();
const dataMap = {
    user: users_js_1.default,
    category: categories_js_1.default,
    unit: units_js_1.default,
    product: products_js_1.default,
    order: orders_js_1.default,
    orderItem: order_items_js_1.default,
};
const seedOrder = ['user', 'category', 'unit', 'product', 'order', 'orderItem'];
async function main() {
    console.log('🚀 Starting Prisma seeding...');
    for (const modelName of seedOrder) {
        const model = prisma[modelName];
        const records = dataMap[modelName];
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
        }
        catch (err) {
            console.error(`❌ Error seeding ${modelName}: ${err.message}`);
            console.log('Trying one-by-one insertion...');
            for (const record of records) {
                try {
                    await model.create({ data: record });
                }
                catch (e) {
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
//# sourceMappingURL=seed.js.map
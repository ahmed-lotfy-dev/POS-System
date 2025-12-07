"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const users_js_1 = __importDefault(require("./data/users.js"));
const categories_js_1 = __importDefault(require("./data/categories.js"));
const units_js_1 = __importDefault(require("./data/units.js"));
const products_js_1 = __importDefault(require("./data/products.js"));
const orders_js_1 = __importDefault(require("./data/orders.js"));
const order_items_js_1 = __importDefault(require("./data/order_items.js"));
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
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
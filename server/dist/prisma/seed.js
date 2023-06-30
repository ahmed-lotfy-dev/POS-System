"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            email: "elshenawy19@gmail.com",
            username: "Ahmed Lotfy",
            isAdmin: true,
            isConfirm: true,
            password: "$argon2id$v=19$m=65536,t=3,p=4$YmKW1FCs7JNA4EPrs9E+dA$kt3MebnV3SWXhcmZPGt9a2Yu3mx87aVdcfz5cjw6tGo"
        }
    });
    const product = await prisma.product.create({
        data: {
            id: 1,
            name: "banana",
            code: 122,
            category: "fruits",
            price: 399,
            unit: "kg",
            image: "https://pos-images.ahmedlotfy.me/linux_software.jpg"
        }
    });
    const category = await prisma.category.create({
        data: {
            id: 1,
            name: "fruits",
        }
    });
    const unit = await prisma.unit.create({
        data: {
            id: 1,
            name: "kg",
        }
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "elshenawy19@gmail.com",
      username: "Ahmed Lotfy",
      isAdmin: true,
      isConfirm: true,
      password: "$argon2id$v=19$m=65536,t=3,p=4$YmKW1FCs7JNA4EPrs9E+dA$kt3MebnV3SWXhcmZPGt9a2Yu3mx87aVdcfz5cjw6tGo",
    },
  });

  const unit = await prisma.unit.create({
    data: {
      name: "kg",
    },
  });

  const category = await prisma.category.create({
    data: {
      image: "",
      name: "fruits",
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "banana",
      code: 122,
      price: 399,
      unit: {
        connect: { id: unit.id },
      },
      category: {
        connect: { id: category.id },
      },
      image: "https://pos-images.ahmedlotfy.me/linux_software.jpg",
    },
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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return prisma.user.create({
        data: {
          name: `user${i}`,
          email: `user${i}@example.com`,
        },
      });
    })
  );
  const categories = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return prisma.category.create({
        data: {
          name: `category${i}`,
        },
      });
    })
  );
  const goods = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return prisma.goods.create({
        data: {
          name: `goods${i}`,
          price: i * 100,
          userId: users[i].id,
          categoryId: categories[i].id,
        },
      });
    })
  );
  console.log(users, categories, goods)
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});

import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 24; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        images: faker.image.imageUrl(),
        videos: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
          11
        )}`,
        price: parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
        userId: 1,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

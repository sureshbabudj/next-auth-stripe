import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findImageUrl() {
  const response = await fetch("https://picsum.photos/200/300");
  return response.url;
}

async function updateImageColumn() {
  // Fetch all products
  const products = await prisma.product.findMany();

  // Update each product with a new image URL
  for (const product of products) {
    const imageUrl = await findImageUrl();
    await prisma.product.update({
      where: { id: product.id },
      data: { images: imageUrl },
    });
  }

  console.log(`Image column updated in ${updateResponse.count} rows.`);
}

updateImageColumn()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

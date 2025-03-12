import { PrismaClient } from '@prisma/client';
import { createMockData } from '../../../script/generate.mock'; // Ajustez le chemin si nécessaire

const prisma = new PrismaClient();
console.log('Starting seed script...');

async function main() {
  console.log('Seeding database...');
  await createMockData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

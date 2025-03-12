import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createMockData() {
  try {
    // 1. Créer des Clients
    const client = await prisma.client.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        contactEmail: faker.internet.email(),
      },
    });

    console.log("Client created:", client);

    // 2. Créer des Utilisateurs liés au client
    const saltRounds = 10;

    const users = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
        const plainPassword = 'Password123@';
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        return prisma.user.create({
        data: {
            email: faker.internet.email(),
            password: hashedPassword,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            role: faker.helpers.arrayElement(['participant', 'coach', 'admin', 'admin_client']),
            clientId: client.id,
        },
        });
    })
    );

    console.log("Users created:", users);

    // 3. Créer des Catégories
    const categories = await Promise.all(
      Array.from({ length: 3 }).map(() =>
        prisma.category.create({
          data: {
            name: faker.commerce.department(),
          },
        })
      )
    );

    console.log("Categories created:", categories);

    // 4. Créer des Challenges associés aux Catégories
    const challenges = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.challenge.create({
          data: {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            difficulty: faker.helpers.arrayElement(["easy", "medium", "hard"]),
            minThreshold: faker.number.int({ min: 1, max: 5 }),
            maxThreshold: faker.number.int({ min: 6, max: 10 }),
            categories: {
              create: {
                categoryId: faker.helpers.arrayElement(categories).id,
              },
            },
          },
        })
      )
    );

    console.log("Challenges created:", challenges);

    // 5. Créer une Campagne liée au Client
    const campaign = await prisma.campaign.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.company.catchPhrase(),
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        type: "public",
        clientId: client.id,
        magicCode: generateMagicCode(),
        totalChallenges: faker.number.int({ min: 5, max: 20 }),
        challenges: {
          create: challenges.map((challenge) => ({
            challengeId: challenge.id,
          })),
        },
      },
    });
    function generateMagicCode(length: number = 6): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    

    console.log("Campaign created:", campaign);

    // 6. Ajouter des Participants à la Campagne et à une Team
    const team = await prisma.team.create({
      data: {
        name: faker.company.buzzAdjective(),
        campaignId: campaign.id,
      },
    });

    console.log("Team created:", team);

    const participants = await Promise.all(
      users.map((user) =>
        prisma.participant.create({
          data: {
            userId: user.id,
            campaignId: campaign.id,
            teamId: team.id,
          },
        })
      )
    );

    console.log("Participants created:", participants);
  } catch (error) {
    console.error("Error creating mock data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createMockData();

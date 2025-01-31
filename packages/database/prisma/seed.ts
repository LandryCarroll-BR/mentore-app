import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

// @ts-ignore
export const database = new PrismaClient({ adapter });

export * from '@prisma/client';

async function main() {
  console.log('Seeding database...');

  // Add default roles
  const defaultRoles = [
    { key: 'ADMIN', name: 'Admin', isGlobal: true },
    { key: 'MENTOR', name: 'Mentor', isGlobal: true },
    { key: 'PARTNER', name: 'Partner', isGlobal: true },
  ];

  for (const role of defaultRoles) {
    await database.role.upsert({
      where: { key: role.key },
      update: {}, // Do nothing if the role already exists
      create: {
        key: role.key,
        name: role.name,
        isGlobal: role.isGlobal,
      },
    });
  }

  console.log('Default roles seeded.');

  // Add other seed data here (e.g., default organizations, permissions, or test users)

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });

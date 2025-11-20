import { PrismaClient } from "@/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Pool } from "pg";
import { logger } from "../src/lib/logger";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ==================== HELPERS ====================

async function cleanDatabase() {
  logger.info("🧹 Cleaning database...");
  await prisma.calendarEvent.deleteMany();
  await prisma.task.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.project.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  logger.info("✅ Database cleaned\n");
}

// ==================== SEED FUNCTIONS ====================

async function seedUsers() {
  logger.info("👤 Seeding users...");

  const jose = await prisma.user.create({
    data: {
      name: "Jose Angarita",
      email: "amjose09@gmail.com",
      emailVerified: new Date(),
      image: "https://avatars.githubusercontent.com/u/placeholder",
    },
  });

  const alice = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      emailVerified: new Date(),
      image: "https://avatars.githubusercontent.com/u/placeholder2",
    },
  });

  logger.info(`  ✓ Created ${2} users`);
  return [jose, alice];
}

async function seedProjects(users: Awaited<ReturnType<typeof seedUsers>>) {
  logger.info("📁 Seeding projects...");

  const projects = await Promise.all([
    // Jose's projects
    prisma.project.create({
      data: {
        name: "Work Projects",
        color: "#3b82f6",
        userId: users[0].id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Personal",
        color: "#10b981",
        userId: users[0].id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Learning",
        color: "#f59e0b",
        userId: users[0].id,
      },
    }),

    // Alice's projects
    prisma.project.create({
      data: {
        name: "Home Renovation",
        color: "#8b5cf6",
        userId: users[1].id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Side Business",
        color: "#ec4899",
        userId: users[1].id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Health & Fitness",
        color: "#06b6d4",
        userId: users[1].id,
      },
    }),
  ]);

  logger.info(`  ✓ Created ${projects.length} projects`);
  return projects;
}

async function seedTags(users: Awaited<ReturnType<typeof seedUsers>>) {
  logger.info("🏷️  Seeding tags...");

  const tags = await Promise.all([
    // Jose's tags
    prisma.tag.create({
      data: { name: "Urgent", color: "#ef4444", userId: users[0].id },
    }),
    prisma.tag.create({
      data: { name: "Important", color: "#f97316", userId: users[0].id },
    }),
    prisma.tag.create({
      data: { name: "Later", color: "#64748b", userId: users[0].id },
    }),
    prisma.tag.create({
      data: { name: "Ideas", color: "#a855f7", userId: users[0].id },
    }),

    // Alice's tags
    prisma.tag.create({
      data: { name: "High Priority", color: "#dc2626", userId: users[1].id },
    }),
    prisma.tag.create({
      data: { name: "Research", color: "#2563eb", userId: users[1].id },
    }),
    prisma.tag.create({
      data: { name: "Quick Win", color: "#16a34a", userId: users[1].id },
    }),
    prisma.tag.create({
      data: { name: "Blocked", color: "#94a3b8", userId: users[1].id },
    }),
  ]);

  logger.info(`  ✓ Created ${tags.length} tags`);
  return tags;
}

async function seedTasks(
  users: Awaited<ReturnType<typeof seedUsers>>,
  projects: Awaited<ReturnType<typeof seedProjects>>,
  tags: Awaited<ReturnType<typeof seedTags>>
) {
  logger.info("✅ Seeding tasks...");

  // Jose's projects
  const joseWorkProject = projects[0];
  const josePersonalProject = projects[1];
  const joseLearningProject = projects[2];

  // Alice's projects
  const aliceHomeProject = projects[3];
  const aliceBusinessProject = projects[4];

  // Jose's tags
  const [urgentTag, importantTag, laterTag, ideasTag] = tags.slice(0, 4);

  // Alice's tags
  const [highPriorityTag, researchTag, quickWinTag] = tags.slice(4, 7);

  const tasks = await Promise.all([
    // Jose's tasks
    prisma.task.create({
      data: {
        title: "Complete Prisma 7 migration",
        color: "#3b82f6",
        description: "Migrate from Prisma 6 to Prisma 7 with adapters",
        taskType: "one_time",
        userId: users[0].id,
        projectId: joseWorkProject.id,
        tags: {
          connect: [{ id: urgentTag.id }, { id: importantTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Review pull requests",
        color: "#10b981",
        description: "Review team's PRs for the week",
        taskType: "recurrent",
        userId: users[0].id,
        projectId: joseWorkProject.id,
        tags: {
          connect: [{ id: importantTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Buy groceries",
        color: "#f59e0b",
        description: "Weekly grocery shopping",
        taskType: "recurrent",
        userId: users[0].id,
        projectId: josePersonalProject.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Learn Next.js 16 features",
        color: "#8b5cf6",
        description: "Study new caching strategies and RSC updates",
        taskType: "one_time",
        userId: users[0].id,
        projectId: joseLearningProject.id,
        tags: {
          connect: [{ id: ideasTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Refactor authentication layer",
        color: "#ec4899",
        description: "Improve auth code organization",
        taskType: "one_time",
        userId: users[0].id,
        projectId: joseWorkProject.id,
        tags: {
          connect: [{ id: laterTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Call dentist for appointment",
        color: "#06b6d4",
        taskType: "one_time",
        userId: users[0].id,
        projectId: josePersonalProject.id,
        tags: {
          connect: [{ id: urgentTag.id }],
        },
      },
    }),

    // Alice's tasks
    prisma.task.create({
      data: {
        title: "Get quotes from contractors",
        color: "#8b5cf6",
        description: "Kitchen and bathroom renovation quotes",
        taskType: "one_time",
        userId: users[1].id,
        projectId: aliceHomeProject.id,
        tags: {
          connect: [{ id: highPriorityTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Research LLC formation",
        color: "#ec4899",
        description: "Legal requirements for new business",
        taskType: "one_time",
        userId: users[1].id,
        projectId: aliceBusinessProject.id,
        tags: {
          connect: [{ id: researchTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Update business plan",
        color: "#f59e0b",
        taskType: "one_time",
        userId: users[1].id,
        projectId: aliceBusinessProject.id,
        tags: {
          connect: [{ id: quickWinTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Morning workout routine",
        color: "#06b6d4",
        description: "30 min cardio + stretching",
        taskType: "recurrent",
        userId: users[1].id,
        projectId: projects[5].id, // Health & Fitness
        tags: {
          connect: [{ id: highPriorityTag.id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: "Paint living room",
        color: "#10b981",
        taskType: "one_time",
        userId: users[1].id,
        projectId: aliceHomeProject.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Create social media content",
        color: "#3b82f6",
        description: "Plan posts for next month",
        taskType: "recurrent",
        userId: users[1].id,
        projectId: aliceBusinessProject.id,
        tags: {
          connect: [{ id: quickWinTag.id }],
        },
      },
    }),
  ]);

  logger.info(`  ✓ Created ${tasks.length} tasks`);
  return tasks;
}

// ==================== MAIN ====================

async function main() {
  logger.info("🌱 Starting seed...\n");

  await cleanDatabase();

  const users = await seedUsers();
  const projects = await seedProjects(users);
  const tags = await seedTags(users);
  const tasks = await seedTasks(users, projects, tags);

  logger.info("\n📊 Summary:");
  logger.info(`  👤 Users: ${users.length}`);
  logger.info(`  📁 Projects: ${projects.length}`);
  logger.info(`  🏷️  Tags: ${tags.length}`);
  logger.info(`  ✅ Tasks: ${tasks.length}`);
  logger.info(
    `  📦 Total: ${users.length + projects.length + tags.length + tasks.length} records`
  );

  logger.info("\n✅ Seed completed successfully!");
}

main()
  .catch(e => {
    logger.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

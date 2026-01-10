import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.secondaryTask.deleteMany();
  await prisma.academicTask.deleteMany();

  // Create academic tasks
  const academicTasks = await Promise.all([
    prisma.academicTask.create({
      data: {
        title: 'Data Structures Assignment 3',
        course: 'CS301 - Data Structures',
        description: 'Implement Red-Black Tree with insertion and deletion operations',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        priority: 'HIGH',
        type: 'ASSIGNMENT',
        completed: false,
      },
    }),
    prisma.academicTask.create({
      data: {
        title: 'Database Systems Mid-term',
        course: 'CS401 - Database Systems',
        description: 'Covers SQL, Normalization, and Transaction Management',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        priority: 'HIGH',
        type: 'EXAM',
        completed: false,
      },
    }),
    prisma.academicTask.create({
      data: {
        title: 'Machine Learning Lab 4',
        course: 'CS501 - Machine Learning',
        description: 'Neural Network implementation using TensorFlow',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: 'MEDIUM',
        type: 'LAB',
        completed: false,
      },
    }),
    prisma.academicTask.create({
      data: {
        title: 'Software Engineering Project Phase 2',
        course: 'CS402 - Software Engineering',
        description: 'Complete design documentation and UML diagrams',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        priority: 'HIGH',
        type: 'PROJECT',
        completed: false,
      },
    }),
  ]);

  // Create secondary tasks
  const secondaryTasks = await Promise.all([
    prisma.secondaryTask.create({
      data: {
        title: 'LeetCode Daily Challenge',
        category: 'CP',
        description: 'Solve daily problem and maintain streak',
        goal: 'Maintain 30-day streak',
        completed: false,
      },
    }),
    prisma.secondaryTask.create({
      data: {
        title: 'Build Personal Portfolio Website',
        category: 'PROJECT',
        description: 'Create a modern portfolio using Next.js',
        goal: 'Deploy by end of semester',
        completed: false,
      },
    }),
    prisma.secondaryTask.create({
      data: {
        title: 'Learn Docker & Kubernetes',
        category: 'LEARNING',
        description: 'Complete online course on containerization',
        goal: 'Deploy a containerized app',
        completed: false,
      },
    }),
    prisma.secondaryTask.create({
      data: {
        title: 'Codeforces Contest Participation',
        category: 'CP',
        description: 'Participate in weekly contests',
        goal: 'Reach Expert rating',
        completed: false,
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${academicTasks.length} academic tasks`);
  console.log(`Created ${secondaryTasks.length} secondary tasks`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

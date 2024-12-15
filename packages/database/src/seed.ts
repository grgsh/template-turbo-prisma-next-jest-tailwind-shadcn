import { prisma } from "./client";

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      email: "admin@example.com",
      authId: "auth-1",
      role: "ADMIN",
      name: "Admin User",
      bio: "This is the admin user.",
      phone: "123-456-7890",
      address: "123 Admin St, Admin City, Admin Country",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "normal@example.com",
      authId: "auth-2",
      role: "NORMAL",
      name: "Normal User",
      bio: "This is a normal user.",
      phone: "987-654-3210",
      address: "456 Normal St, Normal City, Normal Country",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "guest@example.com",
      authId: "auth-3",
      role: "GUEST",
      name: "Guest User",
      bio: "This is a guest user.",
    },
  });

  // Create some files
  await prisma.file.createMany({
    data: [
      {
        url: "https://example.com/file1.jpg",
        fileType: "IMAGE_JPEG",
        userId: user1.id,
      },
      {
        url: "https://example.com/file2.png",
        fileType: "IMAGE_PNG",
        userId: user2.id,
      },
      {
        url: "https://example.com/file3.pdf",
        fileType: "APPLICATION_PDF",
        userId: user1.id,
      },
      {
        url: "https://example.com/file4.txt",
        fileType: "APPLICATION_TXT",
        userId: user3.id,
      },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

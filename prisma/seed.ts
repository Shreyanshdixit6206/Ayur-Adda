import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with dummy data...");

  // 1. Create a dummy instructor
  const instructor = await prisma.user.upsert({
    where: { email: "instructor@ayuradda.com" },
    update: {},
    create: {
      email: "instructor@ayuradda.com",
      name: "Dr. Sushruta AI",
      role: "INSTRUCTOR",
      password: "hashed_password_placeholder", // Just for dummy
    },
  });

  console.log("Created Instructor:", instructor.name);

  // 2. Create Dummy Course 1
  const course1 = await prisma.course.upsert({
    where: { slug: "padartha-vijnana-1" },
    update: {},
    create: {
      title: "Padartha Vijnana evam Ayurveda Itihas",
      slug: "padartha-vijnana-1",
      description: "Master the foundational principles, epistemology, and history of Ayurveda in comprehensive detail.",
      thumbnail: "https://images.unsplash.com/photo-1542840410-3092f99611a3?auto=format&fit=crop&q=80",
      bamsYear: 1,
      subject: "Padartha Vijnana",
      price: 2999,
      instructorId: instructor.id,
    },
  });
  console.log("Created Course 1:", course1.title);

  // 3. Create Dummy Course 2
  const course2 = await prisma.course.upsert({
    where: { slug: "rachana-sharir-1" },
    update: {},
    create: {
      title: "Rachana Sharir (Anatomy)",
      slug: "rachana-sharir-1",
      description: "Complete BAMS 1st Year Anatomy covering both Ayurvedic and Modern concepts.",
      thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
      bamsYear: 1,
      subject: "Rachana Sharir",
      price: 3499,
      instructorId: instructor.id,
    },
  });
  console.log("Created Course 2:", course2.title);

  // 4. Create Modules and Lectures for Course 1
  const module1 = await prisma.module.create({
    data: {
      courseId: course1.id,
      title: "Module 1: Ayurveda Nirupana",
      order: 1,
      lectures: {
        create: [
          {
            title: "1.1 Lakshana and Ayu",
            videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            duration: 2700,
            order: 1,
            isPreview: true
          },
          {
            title: "1.2 Ashtanga Ayurveda Outline",
            videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            duration: 2300,
            order: 2,
            isPreview: false
          }
        ]
      }
    }
  });
  
  console.log("Created Module & Lectures for Course 1");
  console.log("Seeding complete!");
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

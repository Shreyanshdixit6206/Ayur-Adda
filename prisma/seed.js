"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeding database with dummy data...");
        // 1. Create a dummy instructor
        const instructor = yield prisma.user.upsert({
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
        const course1 = yield prisma.course.upsert({
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
        const course2 = yield prisma.course.upsert({
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
        const module1 = yield prisma.module.create({
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
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { courseId, price } = body;

    if (!courseId || !price) {
      return new NextResponse("Missing course or price", { status: 400 });
    }

    // Convert price to paise (lowest denomination in INR)
    const amountInPaise = Math.round(price * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_course_${courseId}_${session.user.id}`.substring(0, 40),
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new Error("Failed to create Razorpay Order");
    }

    // Save payment record in database as PENDING
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        courseId,
        razorpayOrderId: order.id,
        amount: price,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("[RAZORPAY_CREATE_ORDER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

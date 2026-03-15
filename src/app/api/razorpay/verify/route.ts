import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;

    // Create the expected signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const expectedSignature = hmac.digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return new NextResponse("Invalid Signature", { status: 400 });
    }

    // Update Payment DB
    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCESS" },
      });
    }

    // Create Enrollment
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId,
        },
      },
      update: {
        paymentId: payment ? payment.id : undefined,
      },
      create: {
        userId: session.user.id,
        courseId: courseId,
        paymentId: payment ? payment.id : undefined,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[RAZORPAY_VERIFY]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

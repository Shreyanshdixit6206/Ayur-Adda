"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  courseId: string;
  price: number;
}

export function CheckoutButton({ courseId, price }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // Create Order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, price }),
      });

      if (!response.ok) {
        if (response.status === 401) {
           router.push("/auth/login");
        } else {
           alert("Failed to create order");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SOpnx4comm1UhR", // Using test key fallback
        amount: data.amount,
        currency: data.currency,
        name: "AyurAdda",
        description: "Course Enrollment",
        order_id: data.orderId,
        handler: async function (response: any) {
          // Verify
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
            }),
          });

          if (verifyRes.ok) {
            router.refresh();
            router.push("/dashboard");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "BAMS Student",
          email: "student@bams.edu",
        },
        theme: {
          color: "#462E1A", // Primary color of AyurAdda
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed! " + response.error.description);
      });
    } catch (error) {
       console.error(error);
    } finally {
       setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
    >
      {loading ? "Processing..." : "Enroll Now with Razorpay"}
    </Button>
  );
}

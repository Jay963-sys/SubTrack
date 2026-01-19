"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createSubscription(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.subscription.create({
    data: {
      userId,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      startDate: new Date(formData.get("startDate") as string),
      billingCycle: formData.get("billingCycle") as string,
      status: "ACTIVE",
    },
  });

  revalidatePath("/dashboard");
}

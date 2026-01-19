"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function updateSubscription(id: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.subscription.updateMany({
    where: { id, userId },
    data: {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      startDate: new Date(formData.get("startDate") as string),
      billingCycle: formData.get("billingCycle") as string,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subscriptions");
}

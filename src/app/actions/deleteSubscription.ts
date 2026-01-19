"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function deleteSubscription(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.subscription.deleteMany({ where: { id, userId } });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/subscriptions");
}

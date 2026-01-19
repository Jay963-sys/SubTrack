import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import { getNextPaymentDate } from "@/lib/utils";
import { differenceInDays } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const subs = await prisma.subscription.findMany({
      where: { status: "ACTIVE" },
    });

    const notifications = [];
    const debugLogs = [];

    for (const sub of subs) {
      const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
      const daysUntil = differenceInDays(nextDate, new Date());

      debugLogs.push({
        name: sub.name,
        serverDate: new Date().toISOString(),
        calculatedNextDate: nextDate.toISOString(),
        daysUntil: daysUntil,
      });

      if (daysUntil >= 2 && daysUntil <= 4) {
        notifications.push(sub);
      }
    }

    if (notifications.length === 0) {
      return NextResponse.json({
        message: "No reminders found in range.",
        debugInfo: debugLogs,
      });
    }

    const client = await clerkClient();
    let sentCount = 0;

    for (const sub of notifications) {
      const user = await client.users.getUser(sub.userId);
      const email = user.emailAddresses[0]?.emailAddress;

      if (email) {
        const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
        await resend.emails.send({
          from: "SubTrack <onboarding@resend.dev>",
          to: email,
          subject: `Renewing Soon: ${sub.name}`,
          html: `<p>Your ${sub.name} is renewing on ${nextDate.toDateString()}</p>`,
        });
        sentCount++;
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      debugInfo: debugLogs,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

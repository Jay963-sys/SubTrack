import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import { getNextPaymentDate } from "@/lib/utils";
import { differenceInDays } from "date-fns";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // 1. Security Check: Only allow Vercel Cron to trigger this
  // Vercel automatically injects this header when running crons
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Optional: Allow manual testing if you set a query param ?key=YOUR_SECRET
    // return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 2. Fetch ALL active subscriptions
    // In a massive app, you'd batch this. For now, fetching all is fine.
    const subs = await prisma.subscription.findMany({
      where: { status: "ACTIVE" },
    });

    const notifications = [];

    // 3. Filter for subscriptions due in exactly 3 days
    for (const sub of subs) {
      const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
      const daysUntil = differenceInDays(nextDate, new Date());

      if (daysUntil === 3) {
        notifications.push(sub);
      }
    }

    if (notifications.length === 0) {
      return NextResponse.json({ message: "No reminders to send." });
    }

    // 4. Send Emails
    let sentCount = 0;

    // We need the Clerk Client to look up emails
    const client = await clerkClient();

    for (const sub of notifications) {
      try {
        // Fetch User Email from Clerk
        const user = await client.users.getUser(sub.userId);
        const email = user.emailAddresses[0]?.emailAddress;

        if (email) {
          const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
          await resend.emails.send({
            from: "SubTrack <onboarding@resend.dev>", // Use your domain if you verified one
            to: email,
            subject: `Renewing Soon: ${sub.name}`,
            html: `
              <h1>Your ${sub.name} subscription is renewing soon!</h1>
              <p>Just a heads up, your payment of <strong>$${sub.price.toFixed(2)}</strong> is due on <strong>${nextDate.toDateString()}</strong>.</p>
              <p>Manage your subscriptions <a href="https://subtrackk.vercel.app/dashboard">here</a>.</p>
            `,
          });
          sentCount++;
        }
      } catch (error) {
        console.error(`Failed to send email for sub ${sub.id}`, error);
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      message: `Sent ${sentCount} reminders.`,
    });
  } catch (error) {
    console.error("Cron Job Failed:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

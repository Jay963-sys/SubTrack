import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteSubscription } from "@/app/actions/deleteSubscription";
import EditSubButton from "@/components/EditSubButton";
import { getNextPaymentDate, isUrgent, cn } from "@/lib/utils";

export default async function SubscriptionsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          All Subscriptions
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and track your recurring payments.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500">
          <div className="col-span-4">SERVICE</div>
          <div className="col-span-2">AMOUNT</div>
          <div className="col-span-2">CATEGORY</div>
          <div className="col-span-2">CYCLE</div>
          <div className="col-span-2 text-right">ACTIONS</div>
        </div>

        {/* Empty State */}
        {subscriptions.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
              <AlertCircle className="w-6 h-6 text-slate-400" />
            </div>
            <p>No subscriptions found. Add one from the dashboard!</p>
          </div>
        )}

        {/* Table Rows */}
        {subscriptions.map((sub) => {
          // --- Logic Layer ---
          const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
          const urgent = isUrgent(nextDate);

          return (
            <div
              key={sub.id}
              className={cn(
                "grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-slate-50/50 transition-colors",
                // Conditional styling for urgent rows
                urgent ? "bg-red-50/30 border-red-100" : "border-slate-100",
              )}
            >
              {/* Name Column */}
              <div className="col-span-4 font-medium text-slate-900 flex flex-col">
                <div className="flex items-center gap-2">
                  <span>{sub.name}</span>
                  {urgent && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase tracking-wide">
                      Due Soon
                    </span>
                  )}
                </div>
                {/* Visual Alert: Shows calculated date instead of start date */}
                <span
                  className={cn(
                    "text-xs font-normal mt-0.5",
                    urgent ? "text-red-500" : "text-slate-400",
                  )}
                >
                  Next: {format(nextDate, "MMM d, yyyy")}
                </span>
              </div>

              {/* Price */}
              <div className="col-span-2 font-bold text-slate-900">
                ${sub.price.toFixed(2)}
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {sub.category}
                </span>
              </div>

              {/* Cycle */}
              <div className="col-span-2 text-sm text-slate-500 lowercase capitalize">
                {sub.billingCycle}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-2">
                {/* Edit Button with Date Serialization Fix */}
                <EditSubButton
                  sub={{
                    ...sub,
                    startDate: sub.startDate.toISOString(), // Convert Date to String
                  }}
                />

                {/* Delete Button */}
                <form action={deleteSubscription.bind(null, sub.id)}>
                  <button
                    type="submit"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Subscription"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

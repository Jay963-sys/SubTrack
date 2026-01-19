import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteSubscription } from "@/app/actions/deleteSubscription";
import EditSubButton from "@/components/EditSubButton";
import { getNextPaymentDate, isUrgent, cn } from "@/lib/utils";
import DeleteSubButton from "@/components/DeleteSubButton";

export default async function SubscriptionsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          All Subscriptions
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Manage and track your recurring payments.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500">
          <div className="col-span-4">SERVICE</div>
          <div className="col-span-2">AMOUNT</div>
          <div className="col-span-2">CATEGORY</div>
          <div className="col-span-2">CYCLE</div>
          <div className="col-span-2 text-right">ACTIONS</div>
        </div>

        {subscriptions.map((sub) => {
          const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
          const urgent = isUrgent(nextDate);

          return (
            <div
              key={sub.id}
              className={cn(
                "grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-slate-50/50",
                urgent ? "bg-red-50/30 border-red-100" : "border-slate-100",
              )}
            >
              <div className="col-span-4 font-medium text-slate-900 flex flex-col">
                <div className="flex items-center gap-2">
                  <span>{sub.name}</span>
                  {urgent && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase">
                      Due
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-0.5",
                    urgent ? "text-red-500" : "text-slate-400",
                  )}
                >
                  Next: {format(nextDate, "MMM d, yyyy")}
                </span>
              </div>

              <div className="col-span-2 font-bold text-slate-900">
                ${sub.price.toFixed(2)}
              </div>

              <div className="col-span-2">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700">
                  {sub.category}
                </span>
              </div>

              <div className="col-span-2 text-sm text-slate-500 capitalize">
                {sub.billingCycle}
              </div>

              <div className="col-span-2 flex justify-end gap-2">
                <EditSubButton
                  sub={{ ...sub, startDate: sub.startDate.toISOString() }}
                />
                <DeleteSubButton subId={sub.id} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {subscriptions.length === 0 && (
          <div className="text-center text-slate-700 py-12">
            <AlertCircle className="mx-auto w-6 h-6 mb-2 text-slate-400" />
            No subscriptions found.
          </div>
        )}

        {subscriptions.map((sub) => {
          const nextDate = getNextPaymentDate(sub.startDate, sub.billingCycle);
          const urgent = isUrgent(nextDate);

          return (
            <div
              key={sub.id}
              className={cn(
                "bg-white border rounded-xl p-4 shadow-sm space-y-2",
                urgent ? "border-red-300 bg-red-50/30" : "border-slate-200",
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-900">{sub.name}</p>
                  <p
                    className={cn(
                      "text-xs",
                      urgent ? "text-red-600" : "text-slate-500",
                    )}
                  >
                    Next: {format(nextDate, "MMM d, yyyy")}
                  </p>
                </div>

                {urgent && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase">
                    Due
                  </span>
                )}
              </div>

              <div className="text-lg font-bold text-slate-900 dark:text-white">
                ${sub.price.toFixed(2)}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                  {sub.category}
                </span>
                <span className="capitalize text-slate-500">
                  {sub.billingCycle}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <EditSubButton
                  sub={{ ...sub, startDate: sub.startDate.toISOString() }}
                />
                <DeleteSubButton subId={sub.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

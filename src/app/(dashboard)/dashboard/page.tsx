import { prisma } from "@/lib/db";
import SubscriptionCard from "@/components/SubscriptionCard";
import AddSubForm from "@/components/AddSubForm";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import { format } from "date-fns";
import { CreditCard, Activity, TrendingUp, DollarSign } from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: userId,
    },
    orderBy: { price: "desc" },
  });

  const totalSpend = subscriptions.reduce((acc, sub) => acc + sub.price, 0);
  const mostExpensive = subscriptions[0];
  const activeSubs = subscriptions.length;

  const categoryMap = subscriptions.reduce(
    (acc, sub) => {
      if (acc[sub.category]) {
        acc[sub.category] += sub.price;
      } else {
        acc[sub.category] = sub.price;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* --- Section 1: Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Financial Overview
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Manage your recurring operational costs.
          </p>
        </div>
        <AddSubForm />
      </div>

      {/* --- Section 2: Key Metrics (Bento Grid) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card A: Main Hero (Total Spend) */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between relative overflow-hidden group">
          {/* Background Decorator */}
          <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-40 h-40" />
          </div>

          <div>
            <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">
              Total Monthly Spend
            </p>
            <h2 className="text-4xl font-bold mt-2">
              ${totalSpend.toFixed(2)}
            </h2>
          </div>

          <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">+2.5%</span> from
            last month
          </div>
        </div>

        {/* Card B: Active Count */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Active Subs
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{activeSubs}</p>
        </div>

        {/* Card C: Highest Expense */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center hover:border-rose-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Highest Cost
            </span>
          </div>
          <p className="text-xl font-bold text-slate-900 truncate">
            {mostExpensive ? mostExpensive.name : "N/A"}
          </p>
          <p className="text-sm text-slate-500">
            ${mostExpensive?.price.toFixed(2) || "0.00"}/mo
          </p>
        </div>
      </div>

      {/* --- Section 3: Content Split --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Chart Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
            <h3 className="font-semibold text-slate-900 mb-6">
              Spend by Category
            </h3>
            {/* We set a fixed height here to ensure the chart renders nicely */}
            <div className="h-64 w-full">
              <CategoryPieChart data={chartData} />
            </div>
          </div>
        </div>

        {/* Right Col: Subscription Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 text-lg">
              Your Subscriptions
            </h3>
            <span className="text-sm text-slate-500">Sorted by price</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                name={sub.name}
                price={sub.price}
                category={sub.category}
                startDate={sub.startDate.toISOString()}
                billingCycle={sub.billingCycle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

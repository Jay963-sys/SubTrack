import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="p-2 bg-blue-600 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          SubTrack.
        </div>

        <Link
          href="/dashboard"
          className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-12 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v1.0 Public Beta
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl mb-6">
          Stop paying for subscriptions <br />
          <span className="text-blue-600">you don't use.</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
          Track your recurring expenses, visualize your spending habits, and
          never miss a renewal date again.
        </p>

        <Link
          href="/dashboard"
          className="group flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
        >
          Get Started for Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full text-left">
          {[
            "Unlimited Subscriptions",
            "Smart Email Alerts",
            "Spending Analytics",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="font-medium text-slate-900">{feature}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

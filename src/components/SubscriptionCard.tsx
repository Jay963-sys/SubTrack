"use client";

import { motion } from "framer-motion";
import { Calendar, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { getNextPaymentDate, isUrgent, cn } from "@/lib/utils";

interface SubCardProps {
  name: string;
  price: number;
  category: string;
  startDate: string; // We pass raw ISO string now
  billingCycle: string;
}

export default function SubscriptionCard({
  name,
  price,
  startDate,
  category,
  billingCycle,
}: SubCardProps) {
  // 1. Calculate Real Dates
  const nextDate = getNextPaymentDate(new Date(startDate), billingCycle);
  const urgent = isUrgent(nextDate);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden",
        urgent ? "border-red-200 ring-1 ring-red-100" : "border-slate-200",
      )}
    >
      {/* Visual Alert Strip for Urgent Items */}
      {urgent && (
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
      )}

      <div className="flex justify-between items-start mb-4 pt-2">
        <div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">{name}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900">${price}</div>
          <span className="text-xs text-slate-400 font-medium uppercase">
            {billingCycle}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 text-sm border-t pt-4 mt-2",
          urgent ? "text-red-600 font-medium" : "text-slate-500",
        )}
      >
        {urgent ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Calendar className="w-4 h-4" />
        )}
        <span>
          {urgent ? "Renewing " : "Next: "}
          {format(nextDate, "MMM d, yyyy")}
        </span>
      </div>
    </motion.div>
  );
}

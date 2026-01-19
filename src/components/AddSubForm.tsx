"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { createSubscription } from "@/app/actions/createSubscription";
import { CATEGORIES, BILLING_CYCLES } from "@/lib/constants";

export default function AddSubForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await createSubscription(formData);
      setIsOpen(false);
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Subscription
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-slate-900">
          New Subscription
        </h2>

        <form
          action={handleSubmit}
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Service Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Netflix"
              className="w-full px-3 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400"
            />
          </div>

          {/* Price + Billing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monthly Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500"></span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  placeholder="$0.00"
                  className="w-full px-3 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Billing
              </label>
              <select
                name="billingCycle"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400"
              >
                {BILLING_CYCLES.map((cycle) => (
                  <option key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                required
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Subscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

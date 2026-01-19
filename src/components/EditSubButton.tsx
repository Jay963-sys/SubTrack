"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { updateSubscription } from "@/app/actions/updateSubscription";
import { CATEGORIES, BILLING_CYCLES } from "@/lib/constants";

interface Subscription {
  id: string;
  name: string;
  price: number;
  category: string;
  billingCycle: string;
  startDate: Date | string;
}

export default function EditSubButton({ sub }: { sub: Subscription }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateForInput = (date: Date | string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Edit Subscription"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit Subscription</h2>

            {/* 👇 SERVER ACTION DIRECTLY */}
            <form
              action={updateSubscription.bind(null, sub.id)}
              className="space-y-4"
              onSubmit={() => setIsOpen(false)}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Service Name
                </label>
                <input
                  name="name"
                  defaultValue={sub.name}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly Cost
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={sub.price}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Billing
                  </label>
                  <select
                    name="billingCycle"
                    defaultValue={sub.billingCycle}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    {BILLING_CYCLES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={sub.category}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
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
                    defaultValue={formatDateForInput(sub.startDate)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

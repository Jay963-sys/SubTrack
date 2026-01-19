"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteSubscription } from "@/app/actions/deleteSubscription";

export default function DeleteSubButton({ subId }: { subId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // Call the server action directly
    await deleteSubscription(subId);

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. The Trigger Button (Trash Icon) */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete Subscription"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* 2. The Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Delete Subscription?
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone. This will permanently remove this
                subscription from your dashboard.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4">
              <button
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
                className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleDelete}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

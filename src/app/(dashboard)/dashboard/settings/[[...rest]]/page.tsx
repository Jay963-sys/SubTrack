"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Account Settings
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your account details and security.
        </p>
      </div>

      <div className="flex justify-center">
        <UserProfile
          path="/dashboard/settings"
          appearance={{
            elements: {
              rootBox: "w-full shadow-none",
              card: "shadow-sm border border-slate-200 rounded-xl w-full",
            },
          }}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SubTrack",
  description: "Subscription Analytics Dashboard",
  icons: {
    icon: "/images/subtrack.png",
    shortcut: "/images/subtrack.png",
    apple: "/images/subtrack.png",
  },
  openGraph: {
    title: "SubTrack",
    description: "Subscription Analytics Dashboard",
    siteName: "SubTrack",
    images: [
      {
        url: "/images/subtrack.png",
        width: 1200,
        height: 630,
        alt: "SubTrack Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTrack",
    description: "Subscription Analytics Dashboard",
    images: ["/images/subtrack.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* 2. Update body classes for sticky footer */}
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          {/* 3. Main content grows to fill space */}
          <div className="flex-1">{children}</div>

          {/* 4. Global Footer sits at the bottom */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

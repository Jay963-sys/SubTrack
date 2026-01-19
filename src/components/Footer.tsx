import Link from "next/link";
import { LayoutDashboard, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              SubTrack.
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Take control of your recurring expenses. Track, manage, and save
              money with smart insights.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} SubTrack Inc. All rights reserved.
            </span>

            {/* Divider for desktop, Break for mobile */}
            <span className="hidden md:inline mx-2">•</span>
            <br className="md:hidden mt-1" />

            {/* Created by Jay */}
            <span>
              Created by{" "}
              <Link
                href="https://jay-dev-portfolio.vercel.app/"
                className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jay
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link
              href="https://github.com/Jay963-sys"
              className="hover:text-slate-600 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://x.com/Jedediah_xo"
              className="hover:text-slate-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

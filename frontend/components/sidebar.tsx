"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Upload", href: "/upload" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "History", href: "/history" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-indigo-600">
          Editorial AI
        </h1>
        <p className="text-sm text-gray-500">
          Resume Intelligence
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                path === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Button */}
      <div className="mt-10">
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          + Analyze New
        </button>
      </div>

    </div>
  );
}
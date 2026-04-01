"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearResumeData } from "@/redux/resumeSlice";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume.data);

  const handleAnalyzeNew = () => {
    dispatch(clearResumeData());
    router.push("/upload");
  };

  const menu = [
    { name: "Upload", href: "/upload", disabled: false },
    { name: "Dashboard", href: "/dashboard", disabled: !resumeData },
    { name: "History", href: "/history", disabled: !resumeData },
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
            {item.disabled ? (
              <div
                title="Upload a resume to unlock this section"
                className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed opacity-50"
              >
                {item.name}
              </div>
            ) : (
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
            )}
          </li>
        ))}
      </ul>

      {/* Bottom Button */}
      <div className="mt-10">
        <button 
          onClick={handleAnalyzeNew}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Analyze New
        </button>
      </div>

    </div>
  );
}
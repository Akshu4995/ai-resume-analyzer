"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearResumeData } from "@/redux/resumeSlice";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume.data);

  const handleAnalyzeNew = () => {
    dispatch(clearResumeData());
    setIsOpen(false);
    router.push("/upload");
  };

  const menu = [
    { name: "Upload", href: "/upload", disabled: false },
    { name: "Dashboard", href: "/dashboard", disabled: !resumeData },
    { name: "Job Matcher", href: "/match-jobs", disabled: !resumeData },
    { name: "History", href: "/history", disabled: !resumeData },
    // 🔥 Added Job Matcher here, disabled until a resume is uploaded!
  ];

  return (
    <>
      {/* 1. MOBILE OVERLAY - Closes menu when tapping outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. MOBILE TOGGLE BUTTON - Floating button for phones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg md:hidden shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 3. SIDEBAR CONTAINER */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-6 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}>

        {/* Logo */}
        {/* Logo - Now a clickable link back to the Landing Page! */}
        <div className="mb-10">
          <Link href="/" className="block group">
            <h1 className="text-xl font-bold text-indigo-600 transition-colors group-hover:text-indigo-700">
              Editorial AI
            </h1>
            <p className="text-sm text-gray-500 transition-colors group-hover:text-gray-700">
              Resume Intelligence
            </p>
          </Link>
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
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${path === item.href
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
    </>
  );
}
"use client";
import "./globals.css";
import Sidebar from "../components/sidebar";
import { store } from "@/redux/store";
import ReduxProvider from "@/Provider/reduxProvides";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-black">
      <ReduxProvider store={store}>  
        <div className="md:flex min-h-screen">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

        </div>
    </ReduxProvider>
      </body>
    </html>
  );
}
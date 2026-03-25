"use client";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { analyzeResume } from "../api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const res = await analyzeResume(file);
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 bg-black text-white min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Resume Analyzer
        </h1>

        {/* Upload */}
        <div className="mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleUpload}
            className="ml-4 bg-blue-500 px-4 py-2 rounded"
          >
            Analyze
          </button>
        </div>

        {loading && <p>Analyzing...</p>}

        {data && (
          <div className="mt-6">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}
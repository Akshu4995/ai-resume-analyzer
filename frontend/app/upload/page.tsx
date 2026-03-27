"use client";

import { useState } from "react";
import Dropzone from "@/components/dropzone";
import { analyzeResume } from "@/api";
import PreviewCard from "@/components/previewCard";

import { useDispatch } from "react-redux";
import { setResumeData } from "@/redux/resumeSlice";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);

    const res = await analyzeResume(file);

    dispatch(setResumeData(res));  // 🔥 save in redux

    setLoading(false);

    router.push("/dashboard");     // 🔥 redirect
  };

  return (
    <div className="p-6 md:p-10">

      {/* Header */}
      <h1 className="text-3xl font-bold">
        Elevate Your Career Narrative
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Upload your resume to get AI insights
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <textarea
          placeholder="Describe your target job or requirements..."
          className="w-full border border-gray-300 rounded-lg p-3 mt-4"
        />

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Dropzone onFile={setFile} file={file} />

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          {/* Steps (Dynamic) */}
          <PreviewCard data={data} />

          {/* <div className="grid grid-cols-3 gap-4">
            {["Upload", "Analyze", "Results"].map((step, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${data && i === 2
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-200"
                  }`}
              >
                <p className="text-indigo-600 font-bold">0{i + 1}</p>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div> */}

        </div>

        {/* RIGHT PREVIEW */}
        <div>
          {/* <PreviewCard data={data} /> */}
        </div>

      </div>
    </div>
  );
}
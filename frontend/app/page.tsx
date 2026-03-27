"use client";

import Sidebar from "../components/sidebar";
import UploadCard from "../components/uploadCard";
import { useState } from "react";
import { analyzeResume } from "../api";
import ScoreCard from "../components/scoreCard";
import SkillsCard from "../components/skillsCard";
import JobMatchCard from "../components/jobMatchCard";
import ImprovementsCard from "@/components/improvementCard";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/upload");

  const [file, setFile] = useState<File | any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);




  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    const res = await analyzeResume(file);
    setData(res);
    setLoading(false);
  };

  return (
    <div className="md:flex min-h-screen bg-[#020617] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <motion.div className="flex-1 p-4 md:p-10 overflow-y-auto h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >


        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-400 mt-2">
            Analyze your resume with AI and get job insights
          </p>
        </div>

        {/* Upload Section */}
        <UploadCard
          onFileChange={setFile}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {/* Results (we'll replace this next) */}
        {/* {data && (
          <div className="mt-10 bg-[#0f172a] p-6 rounded-xl">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )} */}
        <div className="relative flex-1 p-8 md:p-12">

          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* your content here */}
          </div>

          {data && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <div className="xl:col-span-1">
                <ScoreCard score={data.score} />
              </div>

              <div className="xl:col-span-2">
                <SkillsCard skills={data.skills} />
              </div>

              <div className="xl:col-span-2">
                <JobMatchCard jobs={data.job_matches} />
              </div>

              <div className="xl:col-span-1">
                <ImprovementsCard improvements={data.improvements} />
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>

  );
}
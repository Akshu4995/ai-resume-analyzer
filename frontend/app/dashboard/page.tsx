"use client";
import ScoreCircle from "../dashboard/scoreCircle";
import ProgressCard from "../dashboard/progressCard";
import KeywordCard from "../dashboard/keywordCard";
import StructureCard from "../dashboard/structureCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";




export default function DashboardPage() {
  const data = useSelector((state: any) => state.resume.data);
  if (!data) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Analysis Yet
        </h2>
        <p className="text-gray-500 mt-2">
          Upload a resume to see insights
        </p>
      </div>
    );
  }
  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
    <div className="p-6 md:p-10 space-y-6">

      {/* Header */}
      <h1 className="text-3xl font-bold">
        Analysis Dashboard
      </h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1">
          <ScoreCircle score={data.score} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ProgressCard />
          <KeywordCard skills={data.skills} />
        </div>

      </div>

      {/* Bottom */}
      <StructureCard improvements={data.improvements} />

    </div>
    </motion.div>
  );
}
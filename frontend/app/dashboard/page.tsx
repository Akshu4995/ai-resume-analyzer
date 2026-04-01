"use client";
import ScoreCircle from "../dashboard/scoreCircle";
import ProgressCard from "../dashboard/progressCard";
import KeywordCard from "../dashboard/keywordCard";
import StructureCard from "../dashboard/structureCard";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearResumeData } from "@/redux/resumeSlice";
import PreviewCard from "@/components/previewCard";
import ProfessionMatchCard from "@/components/professionMatchCard";


export default function DashboardPage() {
  const data = useSelector((state: any) => state.resume.data);
  const dispatch = useDispatch();
  const router = useRouter();

  // Redirect to upload page if no data exists (hard refresh case)
  useEffect(() => {
    if (!data) {
      dispatch(clearResumeData());
      router.push("/upload");
    }
  }, [data, dispatch, router]);
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

      {/* Profession Match Warning */}
      {data && (
        <ProfessionMatchCard
          professionMatch={data.profession_match}
          professionFeedback={data.profession_feedback}
          suggestedChanges={data.suggested_changes || []}
        />
      )}

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1">
          <ScoreCircle score={data?.score} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ProgressCard />
          <KeywordCard skills={data?.skills} />
        </div>

      </div>

      {/* Bottom */}
      <StructureCard roadmap={data?.roadmap} />

          <PreviewCard data={data} />


    </div>
    </motion.div>
  );
}
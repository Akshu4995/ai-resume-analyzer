import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const analyzeResume = async (file: File, userPrompt?: string) => {
  try {
    if (!file) {
      throw new Error("No file selected. Please upload a resume.");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Invalid file format. Please upload a PDF file.");
    }

    console.log("FormData created with file:", file);
    const formData = new FormData();
    formData.append("file", file);

    // Add user prompt if provided
    if (userPrompt && userPrompt.trim()) {
      formData.append("user_prompt", userPrompt.trim());
    }

    const res = await API.post("/analyze-resume", formData);

    // Check if response contains an error
    if (res?.data?.error) {
      throw new Error(res.data.error);
    }

    return res.data;
  } catch (error: any) {
    // Re-throw with a user-friendly message
    const message = error?.response?.data?.error || error?.message || "Failed to analyze resume. Please try again.";
    console.log("Error in analyzeResume:", message);
    throw new Error(message);
  }
};
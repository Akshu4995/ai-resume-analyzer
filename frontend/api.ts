import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const analyzeResume = async (file: File) => {
  console.log("FormData created with file:", file);
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await API.post("/analyze-resume", formData);
  
  return res.data;
};
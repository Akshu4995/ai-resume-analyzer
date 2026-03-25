import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const analyzeResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/analyze-resume", formData);

  return res.data;
};
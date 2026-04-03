"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Define the Shape of our state
interface ResumeState {
  data: any;
  text: string; 
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  data: null,
  text: "", 
  loading: false,
  error: null,
};

// 2. 🔥 The Async Thunk: This handles the API call to Python
export const analyzeResume = createAsyncThunk(
  "resume/analyze",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Replace with your actual Render/Localhost URL
      const response = await axios.post("http://localhost:8000/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // This now includes 'extracted_text' from your main.py
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to analyze resume");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    clearResumeData: (state) => {
      state.data = null;
      state.text = "";
      state.error = null;
    },
  },
  // 3. 🛡️ Extra Reducers: This is where the magic happens
  extraReducers: (builder) => {
    builder
      // While the API is fetching...
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When the API succeeds!
      .addCase(analyzeResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        // ✅ This catches the text from your Python backend and saves it
        state.text = action.payload.extracted_text || ""; 
      })
      // If the API fails (like a 500 error)
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResumeData } = resumeSlice.actions;
export default resumeSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { JobMatch } from '../types/jobMatch';

interface JobMatchState {
  matches: JobMatch[];
  loading: boolean;
  error: string | null;
  // 🔥 Add these new fields for the cover letter state
  generatingLetter: boolean;
  coverLetterText: string | null;
}

const initialState: JobMatchState = {
  matches: [],
  loading: false,
  error: null,
  generatingLetter: false,
  coverLetterText: null,
};

export const fetchJobMatches = createAsyncThunk(
  'jobMatch/fetchMatches',
  // The argument payload (camelCase is fine here)
  async (payload: { resumeText: string; jobs: any[] }, { rejectWithValue }) => {
    try {
      // 🛠️ FIX: Map 'resumeText' to 'resume_text' before sending to FastAPI
      // const response = await axios.post("http://localhost:8000/match-jobs", {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/match-jobs`, {
          resume_text: payload.resumeText, // Changed from payload to explicit mapping
          jobs: payload.jobs
      });
      return response.data.matches;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch matches");
    }
  }
);

// 🔥 New Thunk: Generate Cover Letter
// 🔥 Updated Thunk: Generate Cover Letter
export const generateCoverLetter = createAsyncThunk(
  'jobMatch/generateLetter',
  async (payload: { resumeText: string; jobTitle: string; jobDescription: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/generate-cover-letter", {
        resume_text: payload.resumeText,
        job_title: payload.jobTitle,
        job_description: payload.jobDescription
      });

      // ✅ NEW: Catch backend logic errors gracefully
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data.cover_letter;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to generate cover letter");
    }
  }
);

const jobMatchSlice = createSlice({
  name: 'jobMatch',
  initialState,
  reducers: {
    // A quick way to close the modal and clear the text
    clearCoverLetter: (state) => {
      state.coverLetterText = null;
      state.generatingLetter = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchJobMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 🔥 Handle Cover Letter API States
      .addCase(generateCoverLetter.pending, (state) => {
        state.generatingLetter = true;
        state.error = null;
      })
      .addCase(generateCoverLetter.fulfilled, (state, action) => {
        state.generatingLetter = false;
        state.coverLetterText = action.payload;
      })
      .addCase(generateCoverLetter.rejected, (state, action) => {
        state.generatingLetter = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCoverLetter } = jobMatchSlice.actions;
export default jobMatchSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice";
import jobMatchReducer from './jobMatchSlice'; 

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    jobMatch: jobMatchReducer,
  },
});

// 🔥 ADD THESE TWO LINES TO FIX THE ERROR:
// This tells TypeScript what the "Global State" looks like
export type RootState = ReturnType<typeof store.getState>;

// This tells TypeScript how to handle our Async Thunks (like analyzeResume)
export type AppDispatch = typeof store.dispatch;
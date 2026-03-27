"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResumeData: (state, action) => {
      state.data = action.payload;
    },
    clearResumeData: (state) => {
      state.data = null;
    },
  },
});

export const { setResumeData, clearResumeData } = resumeSlice.actions;
export default resumeSlice.reducer;
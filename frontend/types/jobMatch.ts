export interface JobDescription {
  title: string;
  description: string;
}

export interface JobMatch {
  title: string;
  match_score: number;
  missing_skills: string[];
  why_match: string;
}

export interface JobMatchState {
  matches: JobMatch[];
  loading: boolean;
  error: string | null;
}

export interface MatchRequest {
  resumeText: string;
  jobs: JobDescription[];
}
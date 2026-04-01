from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from groq import Groq
import json
import re
import os
from dotenv import load_dotenv

# 🔥 Load env
load_dotenv()

app = FastAPI()

# 🔥 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 API Key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home():
    return {"message": "API is running 🚀"}


# 🔥 Resume Analyzer API
@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    user_prompt: str = Form(None)
):
    def normalize(text):
        return text.lower().strip()

    try:
        text = ""

        # 📄 Extract PDF text
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

        # 🔍 Debug (optional)
        print("==== TEXT PREVIEW ====")
        print(text[:500])

        # 🤖 AI Prompt
        prompt = f"""
        As an expert Technical Recruiter and Resume Optimizer with 15+ years of experience, analyze the following resume content against the provided user instructions.

       USER INSTRUCTIONS/JOB DESCRIPTION
        {user_prompt}

        Analyze this resume.

        SCORING RULES:
        - Poor: 30–50
        - Average: 50–70
        - Good: 70–85
        - Excellent: 85–95

       Your goal is to provide a high-quality, actionable critique. You must respond ONLY in JSON format with the following keys:

1. "overall_score": A number from 0-100.
2. "summary": A 2-sentence professional overview of the candidate.
3. "strengths": An array of 3 specific technical or professional strengths found.
4. "weaknesses": An array of 3 specific areas for improvement.
5. "ats_optimization": A list of keywords missing that are relevant to the user's instructions.
6. "action_items": A list of 3 concrete steps the user should take to improve this resume.

Ensure the tone is professional, encouraging, and critical where necessary. Do not include any text outside of the JSON block.

       RESUME CONTENT:
        {text}
        """

        # 🔥 AI Call
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        ai_text = response.choices[0].message.content

        # 🧹 Clean response
        clean_text = re.sub(r"```json|```", "", ai_text).strip()

        try:
            parsed = json.loads(clean_text)
        except:
            parsed = {
                "score": 60,
                "skills": [],
                "experience": "",
                "improvements": ["Parsing error"]
            }

        # 🔥 Fix low score issue
        if parsed.get("score", 0) < 30:
            parsed["score"] = 55

        # 💼 Job matching
        jobs = [
            {"title": "Frontend Developer", "skills": ["React", "JavaScript"]},
            {"title": "Backend Developer", "skills": ["Python", "API"]},
            {"title": "Full Stack Developer", "skills": ["React", "Node.js", "MongoDB"]},
        ]

        matched_jobs = []
        parsed_skills = [normalize(s) for s in parsed.get("skills", [])]

        for job in jobs:
            job_skills = [normalize(s) for s in job["skills"]]

            match_count = 0
            for ps in parsed_skills:
                for js in job_skills:
                    if ps in js or js in ps:
                        match_count += 1

            match_percent = int((match_count / len(job_skills)) * 100)

            matched_jobs.append({
                "title": job["title"],
                "match": max(match_percent, 10)
            })

        return {
            **parsed,
            "job_matches": matched_jobs
        }

    except Exception as e:
        return {"error": str(e)}
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
        You are an expert ATS system.

        User goal:
        {user_prompt}

        Analyze this resume.

        SCORING RULES:
        - Poor: 30–50
        - Average: 50–70
        - Good: 70–85
        - Excellent: 85–95

        Return ONLY JSON:

        {{
          "score": number,
          "skills": ["skill1", "skill2"],
          "experience": "short summary",
          "improvements": ["improve1", "improve2"]
        }}

        Resume:
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
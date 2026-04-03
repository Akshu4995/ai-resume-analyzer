from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pdfplumber
from groq import Groq
import json
import re
import os
from typing import List
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

# 🛠️ Schemas for Data Validation
class JobDescription(BaseModel):
    title: str
    description: str

class MatchRequest(BaseModel):
    resume_text: str
    jobs: List[JobDescription]

# ✅ FIXED: Moved outside of MatchRequest!
class CoverLetterRequest(BaseModel):
    resume_text: str
    job_title: str
    job_description: str = "" 

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    resume_text: str
    message: str
    history: List[ChatMessage] = []


@app.get("/")
def home():
    return {"message": "API is running 🚀"}

# ✅ EXISTING FUNCTIONALITY (Untouched)
# ✅ UPGRADED: Advanced AI Resume Analyzer
@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    user_prompt: str = Form(None)
):
    def normalize(text):
        return text.lower().strip()

    try:
        text = ""
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

        # 🔥 The Elite Prompt for the Dashboard
        prompt = f"""
        You are an elite AI Career Coach and ATS Expert.
        Analyze this resume and provide a deeply detailed JSON response.
        
        USER TARGET ROLE/INSTRUCTIONS: {user_prompt or 'General Software Engineer'}
        
        RESUME CONTENT:
        {text}
        
        Return ONLY a raw JSON object. Do not include markdown like ```json.
        Strictly include these exact keys:
        - "score": (integer 0-100, overall ATS compatibility score)
        - "formatting_score": (integer 0-100, visual/readability structure score)
        - "career_summary": (A 2-3 sentence strategic overview of their career transition or growth opportunity based on their skills)
        - "found_keywords": (List of 5-8 strong industry keywords found in their resume)
        - "missing_keywords": (List of 5-8 highly sought-after industry keywords they are missing for their target role)
        - "roadmap": (Array of exactly 3 objects, each with "step" (integer 1-3) and "action" (string 1-2 sentences) detailing a career growth plan)
        - "improvements": (Array of 3-4 specific, actionable tips to improve the resume)
        """

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2 # Keep it low for strict JSON formatting
        )

        ai_text = response.choices[0].message.content
        clean_text = re.sub(r"```json|```", "", ai_text).strip()

        try:
            parsed = json.loads(clean_text)
        except Exception as e:
            # Fallback if the AI messes up the formatting, so the UI doesn't crash
            print(f"JSON Parse Error: {str(e)}\nRaw Output: {clean_text}")
            parsed = {
                "score": 60, 
                "formatting_score": 50,
                "career_summary": "We couldn't generate a full summary. Please try uploading again.",
                "found_keywords": ["Error loading keywords"], 
                "missing_keywords": [],
                "roadmap": [],
                "improvements": ["Parsing error. The AI did not return valid JSON."]
            }

        # Keep your original static matching logic so old components don't break
        jobs = [
            {"title": "Frontend Developer", "skills": ["React", "JavaScript", "Next.js"]},
            {"title": "Backend Developer", "skills": ["Python", "API", "FastAPI"]},
            {"title": "Full Stack Developer", "skills": ["React", "Node.js", "MongoDB", "Python"]},
        ]
        matched_jobs = []
        parsed_skills = [normalize(s) for s in parsed.get("found_keywords", [])]
        for job in jobs:
            job_skills = [normalize(s) for s in job["skills"]]
            match_count = sum(1 for ps in parsed_skills for js in job_skills if ps in js or js in ps)
            match_percent = int((match_count / len(job_skills)) * 100) if job_skills else 0
            matched_jobs.append({"title": job["title"], "match": max(match_percent, 10)})

        # Return all the new rich data + the extracted text for the job matcher
        return {**parsed, "job_matches": matched_jobs, "extracted_text": text}

    except Exception as e:
        print(f"Analyze Resume Error: {str(e)}")
        return {"error": str(e)}

# 🔥 Advanced AI Job Matcher
@app.post("/match-jobs")
async def match_jobs(data: MatchRequest):
    try:
        # Prepare the jobs for the AI to analyze
        jobs_context = "\n".join([f"ID {i}: {j.title} - {j.description[:500]}..." for i, j in enumerate(data.jobs)])

        prompt = f"""
        You are an elite AI Recruitment Engine. Compare the following Resume against the list of Job Descriptions.
        Provide a deeply detailed, professional analysis.
        
        RESUME:
        {data.resume_text}

        JOBS TO MATCH:
        {jobs_context}

        Return ONLY a raw JSON array of objects. Do not include markdown formatting like ```json.
        Each object must strictly have these exact keys:
        - "title": (string)
        - "match_score": (integer 0-100)
        - "matching_skills": (list of strings found in the resume that match the job)
        - "missing_skills": (list of strings missing from the resume)
        - "detailed_analysis": (A comprehensive 3-4 sentence paragraph explaining the candidate's specific fit, referencing their actual experience)
        - "recommendation": (A specific, actionable tip on how to tailor their resume for this exact role)
        """

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3  
        )

        ai_res = response.choices[0].message.content
        clean_res = re.sub(r"```json|```", "", ai_res).strip()
        
        return {"status": "success", "matches": json.loads(clean_res)}

    except Exception as e:
        return {"error": str(e)}
    
# 🔥 AI Cover Letter Generator
@app.post("/generate-cover-letter")
async def generate_cover_letter(data: CoverLetterRequest):
    try:
        prompt = f"""
        You are an expert career coach and executive copywriter. 
        Write a highly professional, engaging, and tailored cover letter for the candidate based on their resume.
        
        CANDIDATE'S RESUME:
        {data.resume_text}
        
        TARGET JOB TITLE:
        {data.job_title}
        
        TARGET JOB CONTEXT:
        {data.job_description}
        
        RULES:
        1. Keep it to 3-4 impactful paragraphs.
        2. Focus on matching their actual resume experience to the target job.
        3. Do NOT use generic placeholders like [Company Name] if you can avoid it.
        4. The tone should be confident, modern, and industry-standard.
        5. Return ONLY the cover letter text.
        """

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7 
        )

        generated_text = response.choices[0].message.content.strip()
        
        return {"status": "success", "cover_letter": generated_text}

    except Exception as e:
        print(f"Backend Error: {str(e)}") 
        return {"error": str(e)}
    
    # 🔥 NEW PHASE: AI Resume Coach Chatbot
@app.post("/chat")
async def resume_chat(data: ChatRequest):
    try:
        # 1. Define the System Prompt to give the AI its persona
        system_prompt = f"""
        You are an elite Technical Recruiter and Resume Coach. 
        You are currently having a conversation with a candidate to help them improve their resume.
        
        CANDIDATE'S CURRENT RESUME:
        {data.resume_text}
        
        RULES:
        1. Answer the user's question directly and concisely.
        2. Always base your advice strictly on the resume provided above.
        3. If they ask to rewrite a bullet point, provide 2-3 highly professional, ATS-friendly options using the STAR method (Situation, Task, Action, Result).
        4. Keep your tone encouraging but highly professional.
        """

        # 2. Format the message history for Llama 3
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add previous history so the bot remembers the conversation
        for msg in data.history:
            if msg.role in ["user", "assistant"]:
                messages.append({"role": msg.role, "content": msg.content})
                
        # Finally, add the user's latest message
        messages.append({"role": "user", "content": data.message})

        # 3. Call the AI
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.5 # A balance between strict facts and creative writing
        )

        reply = response.choices[0].message.content.strip()
        
        return {"status": "success", "reply": reply}

    except Exception as e:
        print(f"Chatbot Error: {str(e)}") 
        return {"error": str(e)}
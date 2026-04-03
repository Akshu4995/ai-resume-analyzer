"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";
import axios from "axios";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Career Coach. Ask me how to improve specific parts of your resume!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Auto-scroll to the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Grab the resume text from Redux so the AI knows what we are talking about!
  const resumeText = useSelector((state: RootState) => state.resume.text);

  const sendMessage = async () => {
    if (!input.trim() || !resumeText) return;

    const userMessage: Message = { role: "user", content: input };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
    //   const response = await axios.post("http://localhost:8000/chat", {
     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {

        resume_text: resumeText,
        message: userMessage.content,
        // Send history (excluding the very first greeting if you want, or just send it all)
        history: newHistory.slice(1) 
      });

      if (response.data.reply) {
        setMessages([...newHistory, { role: "assistant", content: response.data.reply }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newHistory, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // If there is no resume uploaded yet, don't show the chatbot at all
  if (!resumeText) return null;

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-40 ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-bold">AI Resume Coach</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-600"}`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none whitespace-pre-wrap"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask how to improve..."
                className="flex-1 bg-gray-100 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
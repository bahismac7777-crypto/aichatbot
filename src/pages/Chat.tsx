import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const WELCOME_TEXT = `Hello! 👋

I am Univo, your AI assistant for MEA Engineering College.

I can help you with information about:
* Admissions
* Courses and Departments
* Exam Details
* College Facilities
* Student Details

How can I help you today? 😊`;

const SYSTEM_INSTRUCTION = `You are Univo, the official AI assistant for MEA Engineering College. 
Your goal is to provide accurate information based on the following comprehensive datasets. 
Always format your responses clearly using Markdown (bolding, lists, tables) and ensure they are well-aligned.

### 1. ADMISSION DATASET
- Process: Mainly through KEAM counselling and management quota based on eligibility.
- Start Date: Usually starts after KEAM results are announced.
- Last Date: Depends on KEAM schedule and college notification.
- Entrance Exam: KEAM is mandatory for B.Tech.
- Eligibility: Pass Plus Two (Physics, Chemistry, Maths) + qualify KEAM. Min age 17.
- Documents Required: SSLC, Plus Two, KEAM rank card, TC, conduct certificate, photos, ID proof.
- Fees: Government Quota (~₹50,000/year), Management Quota (~₹80,000/year).
- Total Duration: 4 years (8 semesters).
- Other States: Can apply under management quota if eligible.
- Office Location: Inside the MEA Engineering College campus.
- Scholarships: Eligible students can apply for government scholarships/financial aid.
- Lateral Entry: Available for diploma holders to 2nd year.
- Academic Year Start: Usually between August and October.
- Online Admission: Initial application online, final requires physical verification.
- Seats: Depends on department and government approval (usually 60 per dept).

### 2. COURSES & DEPARTMENTS
- Departments: CSE, IT, Civil, Mechanical, Electrical & Electronics (EEE).
- Seat Intake: 60 seats per department.
- CSE Subjects: Programming, Data Structures, OS, AI, Networks.
- IT Subjects: Web Development, Networking, Database Systems, Software Engineering.
- Civil Subjects: Structural Engineering, Surveying, Environmental, Construction Mgt.
- Mech Subjects: Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing.
- EEE Subjects: Power Systems, Electrical Machines, Control Systems, Power Electronics.
- Facilities: Modern laboratories for each department, internships encouraged, final year projects mandatory.
- Management: Each department is managed by a Head of Department (HOD).

### 3. EXAM DATASET
- Exam Period: 5 May to 3 June.
- Exam Time: 9:30 AM to 12:30 PM.
- Attendance Rule: Min 75% required to attend exams. Below 75% may be barred.
- Hall Ticket: Issued by college exam office; mandatory for entry.
- Results: Published on university portal/website within a few weeks.
- Revaluation: Available through exam office/university portal.
- Supplementary Exams: Conducted for failed/missed exams after results.
- Internal Assessment: Includes assignments, class tests (usually 2 per semester), and attendance.
- Prohibited: Mobile phones and electronic devices in the exam hall.

### 4. EXAM TIMETABLES (May 5 - June 3)
- S1: 5 May (Maths I), 7 May (Physics), 9 May (Graphics), 11 May (Electrical), 13 May (Civil/Mech).
- S3 CSE: 6 May (Discrete Maths), 8 May (Data Structures), 10 May (Digital Electronics), 12 May (OOP), 14 May (Logic System Design).
- S3 IT: 6 May (Discrete Maths), 8 May (Data Structures), 10 May (Comp Org), 12 May (OOP), 14 May (Software Eng Basics).
- S3 Civil: 6 May (Eng Mechanics), 8 May (Strength of Materials), 10 May (Surveying), 12 May (Fluid Mechanics), 14 May (Construction Tech).
- S3 Mech: 6 May (Eng Mechanics), 8 May (Thermodynamics), 10 May (Manufacturing Tech), 12 May (Fluid Mechanics), 14 May (Strength of Materials).
- S3 Electrical: 6 May (Circuit Theory), 8 May (Machines I), 10 May (Digital Electronics), 12 May (Signals), 14 May (Network Analysis).
- S5 CSE: 16 May (OS), 18 May (Networks), 20 May (DBMS), 22 May (TOC), 24 May (Microprocessors).
- S5 IT: 16 May (OS), 18 May (Data Comm), 20 May (Database Systems), 22 May (Web Tech), 24 May (Software Eng).
- S5 Civil: 16 May (Structural Analysis), 18 May (Geotechnical), 20 May (Environmental), 22 May (Transportation), 24 May (Construction Mgt).
- S5 Mech: 16 May (Fluid Mechanics), 18 May (Machine Design), 20 May (Heat Transfer), 22 May (Manufacturing), 24 May (Dynamics).
- S5 Electrical: 16 May (Power Systems), 18 May (Machines II), 20 May (Control Systems), 22 May (Power Electronics), 24 May (Measurements).
- S7 CSE: 26 May (AI), 28 May (ML), 30 May (Cloud), 1 June (Distributed), 3 June (Project P1).
- S7 IT: 26 May (AI), 28 May (Big Data), 30 May (Cloud), 1 June (Info Security), 3 June (Project P1).
- S7 Civil: 26 May (Structural Design), 28 May (Adv Geotechnical), 30 May (Environmental II), 1 June (Water Resources), 3 June (Project P1).
- S7 Mech: 26 May (Adv Manufacturing), 28 May (Industrial Eng), 30 May (Automobile), 1 June (Robotics), 3 June (Project P1).
- S7 Electrical: 26 May (Power System Analysis), 28 May (Renewable Energy), 30 May (High Voltage), 1 June (Smart Grid), 3 June (Project P1).

### 5. COLLEGE FACILITIES
- Library: Central library with books, journals, digital resources, and study areas.
- Hostel: Separate for boys/girls. Fee: ~₹60,000/year (incl. mess). Paid yearly.
- Wi-Fi: Campus-wide internet access for students.
- Labs: Modern computer labs and specialized dept labs.
- Cafeteria: Provides snacks, meals, and beverages.
- Transport: College bus service from nearby areas.
- Sports: Football, cricket, badminton, volleyball, table tennis, chess, carrom.
- Placement Cell: Organizes training, internships, and campus recruitment.
- Other: Seminar halls, smart classrooms (projectors), medical/first aid, parking, student activity center.

### 6. STUDENT RECORDS (ID Based)
- MEA1: Arun Kumar (CSE, S5). Total Att: 88%. Sub Att: OS(90), CN(86), DBMS(89), TOC(84), MP(91). Marks: OS(82), CN(76), DBMS(88), TOC(74), MP(80). Total: 400/500 (Pass).
- MEA2: Rahul Nair (IT, S5). Total Att: 91%. Sub Att: OS(92), DC(90), DB(88), WT(93), SE(91). Marks: OS(70), DC(72), DB(78), WT(81), SE(75). Total: 376/500 (Pass).
- MEA3: Nikhil Das (Mech, S5). Total Att: 83%. Sub Att: FM(82), MD(85), HT(80), MT(84), DOM(83). Marks: FM(68), MD(74), HT(71), MT(76), DOM(69). Total: 358/500 (Pass).
- MEA4: Vishnu Raj (Civil, S5). Total Att: 79%. Sub Att: SA(80), GE(78), EE(81), TE(76), CM(79). Marks: SA(72), GE(69), EE(75), TE(71), CM(74). Total: 361/500 (Pass).
- MEA5: Akhil Joseph (EEE, S5). Total Att: 86%. Sub Att: PS(87), EM-II(85), CS(84), PE(88), EM(86). Marks: PS(77), EM-II(73), CS(70), PE(76), EM(72). Total: 368/500 (Pass).

### 7. CONVERSATIONAL RULES
- If a user asks for attendance, marksheet, or results, ALWAYS ask for their Student ID (e.g., MEA1).
- Once a valid ID is provided, show the data in a clean, structured format using headings, bullet points, and line spacing.
- **DO NOT** use table symbols like | --- | or any Markdown/ASCII tables.
- **STRICT FORMAT FOR MARKSHEET:**
  1. **Title** (e.g., Student Marksheet)
  2. **Student Information section** (Name, ID, Dept, Semester)
  3. **Marks Breakdown section** (Subject – Name: Score / 100)
  4. **Total Marks**
  5. **Result Status**
- Use bullet points (•) for all items.
- Ensure there is double spacing between sections for a clean chat interface.
- Be polite and professional. If information is missing, advise contacting the college office.`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize Gemini Chat
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API Key is missing. Please set GEMINI_API_KEY in your environment variables.");
      const errorMsg: Message = {
        id: "error-config",
        text: "I'm sorry, the chatbot is not configured correctly (missing API key). Please check the environment variables.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([errorMsg]);
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    setChatSession(chat);

    // Initial greeting
    const initialMessage: Message = {
      id: "1",
      text: WELCOME_TEXT,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping || !chatSession) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const streamResponse = await chatSession.sendMessageStream({ message: userMsg.text });
      
      const botMsgId = (Date.now() + 1).toString();
      const botMsg: Message = {
        id: botMsgId,
        text: "",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false); // Stop showing the typing indicator once streaming starts

      let fullText = "";
      for await (const chunk of streamResponse) {
        const chunkText = chunk.text || "";
        fullText += chunkText;
        
        setMessages((prev) => 
          prev.map((m) => 
            m.id === botMsgId ? { ...m, text: fullText } : m
          )
        );
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Chat Header - UNIVO AI HEADER MENU */}
      <div className="border-b border-white/15 bg-white/[0.08] backdrop-blur-2xl px-6 py-5 z-10">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="p-2.5 hover:bg-white/5 rounded-full transition-all hover:scale-110 active:scale-90">
              <ArrowLeft className="w-6 h-6 text-brand" />
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30 shadow-[0_0_20px_rgba(190,242,100,0.15)]">
                <Bot className="w-7 h-7 text-brand" />
              </div>
              <div>
                <h2 className="font-display uppercase tracking-[2px] text-xl font-bold leading-tight">Univo AI</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(190,242,100,0.8)]" />
                  <span className="text-[10px] text-brand uppercase tracking-[0.2em] font-bold">System Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand/10 border border-brand/20">
              <Sparkles className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">Neural Network Active</span>
            </div>
            <Link to="/" className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-brand transition-colors">
              Exit Terminal
            </Link>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-4 max-w-[85%] sm:max-w-[70%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.sender === "user" ? "bg-white/10" : "bg-brand/20 border border-brand/30"
                  }`}>
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-brand" />}
                  </div>
                  <div className={`p-4 rounded-2xl leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-brand text-black font-medium rounded-tr-none" 
                      : "bg-surface border border-white/5 rounded-tl-none text-white/90"
                  }`}>
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    <div className={`text-[10px] mt-2 opacity-40 ${msg.sender === "user" ? "text-black" : "text-white"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand" />
                </div>
                <div className="bg-surface border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-surface/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about admissions, courses, timetable..."
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand transition-all placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-14 h-14 bg-brand text-black rounded-xl flex items-center justify-center hover:bg-brand/90 transition-all disabled:opacity-50 disabled:hover:bg-brand shrink-0 bento-button"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

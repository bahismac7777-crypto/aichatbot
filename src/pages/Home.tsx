import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GraduationCap, Calendar, Bell, BookOpen, MessageCircle, ArrowRight, Sparkles, FileText } from "lucide-react";
import { BentoGrid, type BentoItem } from "../components/ui/bento-grid";
import { generateProjectReport } from "../lib/pdfGenerator";

export default function Home() {
  const featureItems: BentoItem[] = [
    {
      title: "Admissions",
      description: "Get instant information about admission procedures, documents, and deadlines at MEA.",
      icon: <GraduationCap className="w-6 h-6" />,
      status: "Live",
      tags: ["Enrollment", "Help"],
      meta: "2026 Intake",
      colSpan: 1,
      href: "/features#admission",
      hasPersistentHover: true,
    },
    {
      title: "Timetable",
      description: "Access your class schedules and exam timetables in real-time.",
      icon: <Calendar className="w-6 h-6" />,
      status: "Updated",
      tags: ["Schedule"],
      href: "/features#timetable",
    },
    {
      title: "Events",
      description: "Stay updated with college seminars, workshops, and cultural fests.",
      icon: <Bell className="w-6 h-6" />,
      status: "Active",
      tags: ["Campus Life"],
      href: "/features#events",
    },
    {
      title: "Courses",
      description: "Explore curriculum details, prerequisites, and faculty info for all departments.",
      icon: <BookOpen className="w-6 h-6" />,
      status: "Detailed",
      tags: ["Academic"],
      colSpan: 2,
      href: "/features#courses",
    },
    {
      title: "Support",
      description: "24/7 AI-powered student help for all your campus queries.",
      icon: <MessageCircle className="w-6 h-6" />,
      status: "Online",
      tags: ["AI Assistant"],
      colSpan: 1,
      href: "/features#support",
      cta: "Ask Univo →"
    },
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(190,242,100,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-display uppercase tracking-[1.5px] mb-8 leading-[1.0]">
              Univo – AI Assistant for <br />
              <span className="text-brand">MEA Engineering College</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant answers about admissions, courses, facilities, and student life at MEA Engineering College.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/chat"
                className="w-full sm:w-auto bg-brand text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-brand/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Chat with Univo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/features"
                className="w-full sm:w-auto px-8 py-4 rounded-md text-lg font-bold border border-white/10 hover:bg-white/5 transition-all text-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-display uppercase tracking-[1.5px] mb-6">About Univo</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Univo is an AI chatbot designed to help students quickly get important college information. 
                It provides instant answers about admissions, class schedules, events, and campus services.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link 
                  to="/features"
                  className="px-6 py-3 rounded-md text-sm font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 group"
                >
                  Learn More about Features
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={generateProjectReport}
                  className="px-6 py-3 rounded-md text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group text-brand"
                >
                  <FileText className="w-4 h-4" />
                  Download Project Report
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-md bg-white/5 border border-white/5">
                  <div className="text-3xl font-bold text-brand mb-1">24/7</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">Availability</div>
                </div>
                <div className="p-4 rounded-md bg-white/5 border border-white/5">
                  <div className="text-3xl font-bold text-brand mb-1">Instant</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">Responses</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-md overflow-hidden glass p-8 flex items-center justify-center"
            >
              <div className="w-full h-full bg-brand/5 rounded-md border border-brand/10 flex items-center justify-center">
                <MessageCircle className="w-32 h-32 text-brand opacity-20" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand/20 blur-3xl rounded-full" />
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-brand/10 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Summary */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              Intelligent Platform
            </div>
            <h2 className="text-5xl font-display uppercase tracking-[1.5px] mb-4">Core Features</h2>
            <p className="text-white/60">Everything you need to navigate college life, powered by AI.</p>
          </div>
          
          <BentoGrid items={featureItems} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display uppercase tracking-[1.5px] mb-4">How It Works</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Ask your question", desc: "Type any query about college life, admissions, or schedules." },
              { step: "02", title: "Univo understands", desc: "Our AI processes your request using advanced natural language processing." },
              { step: "03", title: "Get instant answers", desc: "Receive accurate information in seconds, no waiting required." },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/5 absolute -top-8 -left-4 select-none">{item.step}</div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-white/60 relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


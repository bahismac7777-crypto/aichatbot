import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { GraduationCap, Calendar, Bell, BookOpen, MessageCircle } from "lucide-react";

export default function Features() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const features = [
    {
      id: "admission",
      icon: GraduationCap,
      title: "Admission Help",
      desc: "Get information about admission procedures, documents, and deadlines. We guide you through every step of the enrollment process.",
    },
    {
      id: "timetable",
      icon: Calendar,
      title: "Timetable Updates",
      desc: "Check class schedules and exam timetables easily. Stay organized with real-time updates on room changes or cancellations.",
    },
    {
      id: "events",
      icon: Bell,
      title: "Event Information",
      desc: "Stay updated with college events, seminars, and workshops. Never miss an opportunity to network or learn something new.",
    },
    {
      id: "courses",
      icon: BookOpen,
      title: "Course Details",
      desc: "Learn about available courses and departments. Explore curriculum details, prerequisites, and faculty information.",
    },
    {
      id: "support",
      icon: MessageCircle,
      title: "Student Support",
      desc: "Ask questions anytime and get quick responses. From hostel queries to library hours, Univo is here to help 24/7.",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-[1.5px] mb-6 leading-[1.0]">
            What <span className="text-brand">Univo</span> <br /> Can Do
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore the comprehensive features designed to make your college life smoother and more efficient.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              id={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-md bg-surface border border-white/5 hover:border-brand/20 transition-all group scroll-mt-32"
            >
              <div className="w-14 h-14 bg-brand/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-brand transition-colors">
                <feature.icon className="w-8 h-8 text-brand group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

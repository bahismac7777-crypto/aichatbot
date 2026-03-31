import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-[1.5px] mb-6 leading-[1.0]">
            Contact <span className="text-brand">Us</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Have questions? Reach out to us. We're here to help you with any queries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-12">
              {[
                { icon: Mail, title: "Email", desc: "support@college.edu" },
                { icon: Phone, title: "Phone", desc: "+91 XXXXX XXXXX" },
                { icon: MapPin, title: "Address", desc: "Your College Name, City, State, India" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 bg-brand/10 rounded-md flex items-center justify-center shrink-0">
                    <item.icon className="text-brand w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-md bg-surface border border-white/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-brand text-black font-bold py-4 rounded-md hover:bg-brand/90 transition-all flex items-center justify-center gap-2 bento-button">
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

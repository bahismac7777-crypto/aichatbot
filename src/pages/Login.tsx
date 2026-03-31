import { motion } from "motion/react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="pt-32 pb-24 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
            <Lock className="text-brand w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-[1.5px] mb-4">
            Welcome <span className="text-brand">Back</span>
          </h1>
          <p className="text-white/60">
            Sign in to access your personalized college dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-md bg-surface border border-white/5 shadow-2xl"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder="name@college.edu"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/60">Password</label>
                <button type="button" className="text-xs text-brand hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full bg-brand text-black font-bold py-4 rounded-md hover:bg-brand/90 transition-all flex items-center justify-center gap-2 group bento-button">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm">
              Don't have an account?{" "}
              <Link to="/contact" className="text-brand hover:underline font-medium">
                Contact Admin
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

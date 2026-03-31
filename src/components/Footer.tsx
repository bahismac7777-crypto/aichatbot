import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-top border-white/5 bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <Logo className="w-10 h-10" />
          <span className="text-xl font-display uppercase tracking-[1.5px] ml-[2px]">Univo</span>
        </div>
        <p className="text-white/40 text-sm mb-6">
          Helping students with smart information.
        </p>
        <div className="text-white/20 text-xs">
          © 2026 Univo AI Chatbot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

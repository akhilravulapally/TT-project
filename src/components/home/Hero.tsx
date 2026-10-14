import React from 'react';
import { Shield, Zap, Sparkles, Key, Award, ChevronRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  return (
    <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Ambient Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.25),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide shadow-inner mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>2024–2025 Luxury & Electric Fleet Now Available</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300">Save 20% with code APEX20</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Command The Road. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Drive Extraordinary.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            From hair-raising Porsche supercars to whisper-quiet Mercedes executive lounges and Tesla Plaid speed machines — delivered directly to your doorstep or airport terminal.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Fleet & Rates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onHowItWorksClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-semibold text-sm tracking-wide transition-all backdrop-blur-md cursor-pointer"
            >
              How Handover Works
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/60 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">1,500+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Pristine Fleet Vehicles</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Airport Hubs Covered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.98 / 5</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Verified Driver Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Guaranteed Vehicle Model</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

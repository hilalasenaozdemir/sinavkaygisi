import React, { useState } from 'react';
import { getRandomQuote, MOTIVATIONAL_QUOTES } from '../data/quotes';
import { MotivationalQuote } from '../types';
import { Sparkles, RefreshCw, HeartHandshake, Quote as QuoteIcon } from 'lucide-react';

export const DailyQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote>(() => getRandomQuote());
  const [isRotating, setIsRotating] = useState(false);

  const handleNextQuote = () => {
    setIsRotating(true);
    let next: MotivationalQuote;
    do {
      next = getRandomQuote();
    } while (next.id === currentQuote.id && MOTIVATIONAL_QUOTES.length > 1);
    
    setTimeout(() => {
      setCurrentQuote(next);
      setIsRotating(false);
    }, 200);
  };

  return (
    <div
      id="daily-quote-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-lg shadow-rose-500/10 transition-all hover:shadow-xl hover:shadow-rose-500/15"
    >
      <div className="relative rounded-[22px] bg-white/95 backdrop-blur-md p-5 sm:p-6">
        {/* Subtle decorative background watermarks */}
        <QuoteIcon className="absolute -top-3 -right-3 w-28 h-28 text-slate-100/70 -rotate-12 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-300">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Günün Sınav Kaygısı & Güç Sözü
                </span>
                <span className="text-xs text-slate-400 font-medium">#{currentQuote.id}</span>
              </div>

              <blockquote className="text-base sm:text-lg font-semibold text-slate-800 leading-snug tracking-tight">
                "{currentQuote.quote}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="text-xs font-bold text-slate-500">
                  — {currentQuote.author}
                </span>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium">{currentQuote.stressTip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              id="next-quote-button"
              onClick={handleNextQuote}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              title="Başka bir ilham verici söz getir"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Yeni Söz</span>
            </button>
          </div>
        </div>

        {/* Mobile stress tip shown underneath */}
        <div className="sm:hidden mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-100">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="font-medium text-[11px]">{currentQuote.stressTip}</span>
        </div>
      </div>
    </div>
  );
};

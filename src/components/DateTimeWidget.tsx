import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export const DateTimeWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
  const [examDate, setExamDate] = useState<string>(() => {
    return localStorage.getItem('sinav_hedef_tarih') || '2026-06-20';
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExamDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamDate(e.target.value);
    localStorage.setItem('sinav_hedef_tarih', e.target.value);
  };

  const calculateDaysLeft = () => {
    const target = new Date(examDate);
    const diff = target.getTime() - currentTime.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const formattedTime = currentTime.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative">
      <div
        id="date-time-widget-btn"
        onClick={() => setShowCalendarModal(!showCalendarModal)}
        className="flex items-center gap-3 px-3.5 py-2 bg-white/95 hover:bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow transition-all cursor-pointer backdrop-blur-sm group"
        title="Takvim ve Geri Sayımı Aç"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
          <Clock className="w-4 h-4 animate-pulse" />
        </div>

        <div className="text-right">
          <div className="text-sm font-bold tracking-tight text-slate-800 font-mono">
            {formattedTime}
          </div>
          <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1 justify-end">
            <Calendar className="w-3 h-3 text-indigo-500" />
            <span className="capitalize">{formattedDate.split(',')[0]}</span>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center pl-2.5 border-l border-slate-100">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Hedefe</span>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
            {calculateDaysLeft()} Gün
          </span>
        </div>
      </div>

      {/* Popover Calendar Modal */}
      {showCalendarModal && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Akademik Takvim</h4>
            </div>
            <button
              onClick={() => setShowCalendarModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
          </div>

          <div className="py-3">
            <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/60 mb-3">
              <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold mb-1">
                <span>Hedef Sınav Tarihi</span>
                <span className="flex items-center gap-1 text-[11px] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-500" /> {calculateDaysLeft()} gün kaldı
                </span>
              </div>
              <input
                type="date"
                value={examDate}
                onChange={handleExamDateChange}
                className="w-full text-xs font-medium px-2 py-1.5 bg-white rounded-lg border border-indigo-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="text-[12px] text-slate-500 space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex justify-between font-medium">
                <span>Bugün:</span>
                <span className="text-slate-700 font-semibold">{formattedDate}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Zaman:</span>
                <span className="text-indigo-600 font-mono font-bold">{formattedTime}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            "Zamanı verimli kullanan, sınav kaygısını yarı yarıya azaltır."
          </p>
        </div>
      )}
    </div>
  );
};

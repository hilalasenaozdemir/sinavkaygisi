import React, { useState, useEffect } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Wind, Play, Pause, RotateCcw, CheckCircle2, Heart, Sparkles } from 'lucide-react';

interface BreathingExerciseProps {
  currentStudent: Student | null;
  onClose: () => void;
}

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ currentStudent, onClose }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [technique, setTechnique] = useState<'box' | 'calm'>('box'); // box: 4-4-4-4, calm: 4-7-8
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timer, setTimer] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  // Technique timing:
  // box: inhale 4s, hold1 4s, exhale 4s, hold2 4s
  // calm (4-7-8): inhale 4s, hold1 7s, exhale 8s, hold2 0s
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);

        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Phase transition
          if (technique === 'box') {
            if (phase === 'inhale') {
              setPhase('hold1');
              return 4;
            } else if (phase === 'hold1') {
              setPhase('exhale');
              return 4;
            } else if (phase === 'exhale') {
              setPhase('hold2');
              return 4;
            } else {
              setPhase('inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          } else {
            // 4-7-8 Calm
            if (phase === 'inhale') {
              setPhase('hold1');
              return 7;
            } else if (phase === 'hold1') {
              setPhase('exhale');
              return 8;
            } else {
              setPhase('inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, phase, technique]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase('inhale');
    setTimer(4);
    setCompletedCycles(0);
    setTotalSeconds(0);
    setFinished(false);
  };

  const handleFinishAndSave = () => {
    setIsRunning(false);
    setFinished(true);

    if (currentStudent && totalSeconds > 10) {
      logExerciseCompletion({
        studentNumber: currentStudent.studentNumber,
        exerciseType: 'breathing',
        exerciseTitle: `Nefes Egzersizi (${technique === 'box' ? 'Kutu Nefesi' : '4-7-8 Sakinlik'})`,
        durationSeconds: totalSeconds,
        score: completedCycles * 10
      });
    }
  };

  const getPhaseDetails = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: 'Derin Nefes Al',
          subtitle: 'Karnını ve göğsünü temiz hava ile doldur',
          color: 'from-emerald-400 to-teal-500',
          scale: 'scale-125'
        };
      case 'hold1':
        return {
          title: 'Nefesini Tut',
          subtitle: 'Huzur ve oksijenin tüm bedenine yayıldığını hisset',
          color: 'from-cyan-400 to-blue-500',
          scale: 'scale-125 ring-8 ring-cyan-200'
        };
      case 'exhale':
        return {
          title: 'Yavaşça Nefes Ver',
          subtitle: 'Ağzından tüm stresi ve kaygıyı serbest bırak',
          color: 'from-purple-400 to-indigo-500',
          scale: 'scale-90'
        };
      case 'hold2':
        return {
          title: 'Dinginlikte Bekle',
          subtitle: 'Bedeninin gevşemesine izin ver',
          color: 'from-amber-400 to-orange-400',
          scale: 'scale-95'
        };
    }
  };

  const currentPhase = getPhaseDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-500/30 p-6 sm:p-8 text-white shadow-2xl flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Wind className="w-3.5 h-3.5" />
            <span>Diyafram ve Sinir Sistemi Sakinleştirici</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            Rehberli Nefes Egzersizi
          </h3>
          <p className="text-xs text-indigo-200">
            Kalp atış hızını yavaşlatır, sınav anındaki adrenalini doğal yolla yatıştırır.
          </p>
        </div>

        {/* Technique Switcher */}
        <div className="flex gap-2 p-1.5 bg-white/10 rounded-2xl mb-8 border border-white/10">
          <button
            onClick={() => {
              setTechnique('box');
              handleReset();
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              technique === 'box'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            4x4 Kutu Nefesi (Odak)
          </button>
          <button
            onClick={() => {
              setTechnique('calm');
              handleReset();
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              technique === 'calm'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            4-7-8 Derin Sakinleşme
          </button>
        </div>

        {/* Pulsing Visual Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Outer glowing rings */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentPhase.color} opacity-20 blur-xl transition-all duration-1000 ${
              isRunning ? 'animate-pulse' : ''
            }`}
          />

          {/* Animated breathing orb */}
          <div
            className={`w-48 h-48 rounded-full bg-gradient-to-tr ${currentPhase.color} shadow-2xl flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ease-in-out transform ${
              isRunning ? currentPhase.scale : 'scale-100'
            }`}
          >
            <span className="text-4xl font-black font-mono tracking-tighter text-white drop-shadow">
              {timer}
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-white/95 mt-1">
              {currentPhase.title}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-indigo-200/90 text-center max-w-sm mb-6 h-6">
          {isRunning ? currentPhase.subtitle : 'Başlat butonuna bas ve dairenin ritmini takip et.'}
        </p>

        {/* Counters */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-6 text-center">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-indigo-300 font-semibold uppercase block">Tamamlanan Tur</span>
            <span className="text-base font-bold text-white">{completedCycles} Döngü</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-indigo-300 font-semibold uppercase block">Toplam Süre</span>
            <span className="text-base font-bold text-white font-mono">{totalSeconds} sn</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{completedCycles > 0 ? 'Devam Et' : 'Egzersizi Başlat'}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>Duraklat</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {totalSeconds >= 10 && !finished && (
            <button
              onClick={handleFinishAndSave}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Tamamla & Kaydet</span>
            </button>
          )}
        </div>

        {finished && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Harika bir seans! Aktivite günlüğüne başarıyla işlendi.</span>
          </div>
        )}
      </div>
    </div>
  );
};

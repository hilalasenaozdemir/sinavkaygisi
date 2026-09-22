import React, { useState, useEffect } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Target, Timer, Trophy, RotateCcw } from 'lucide-react';

interface StroopFocusGameProps {
  currentStudent: Student | null;
  onClose: () => void;
}

interface ColorOption {
  name: string;
  twText: string;
  hex: string;
}

const COLORS: ColorOption[] = [
  { name: 'KIRMIZI', twText: 'text-red-500', hex: '#ef4444' },
  { name: 'MAVİ', twText: 'text-blue-500', hex: '#3b82f6' },
  { name: 'YEŞİL', twText: 'text-emerald-500', hex: '#10b981' },
  { name: 'SARI', twText: 'text-amber-400', hex: '#f59e0b' },
  { name: 'MOR', twText: 'text-purple-500', hex: '#a855f7' }
];

export const StroopFocusGame: React.FC<StroopFocusGameProps> = ({ currentStudent, onClose }) => {
  const [targetWord, setTargetWord] = useState<ColorOption>(COLORS[0]);
  const [inkColor, setInkColor] = useState<ColorOption>(COLORS[1]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateNewRound = () => {
    const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    let randomInk = COLORS[Math.floor(Math.random() * COLORS.length)];
    // Ensure variety
    setTargetWord(randomWord);
    setInkColor(randomInk);
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    setIsFinished(false);
    generateNewRound();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      if (currentStudent) {
        logExerciseCompletion({
          studentNumber: currentStudent.studentNumber,
          exerciseType: 'stroop_focus',
          exerciseTitle: 'Zihin & Odaklanma Stroop Testi',
          durationSeconds: 30,
          score: score
        });
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, currentStudent, score]);

  const handleColorClick = (chosenColor: ColorOption) => {
    if (!isActive) return;

    // Rule: The player must click the INK COLOR (yazının mürekkep rengi), not the text meaning!
    if (chosenColor.name === inkColor.name) {
      setScore((s) => s + 10);
      setFeedback('correct');
    } else {
      setScore((s) => Math.max(0, s - 5));
      setFeedback('wrong');
    }

    setTimeout(() => {
      generateNewRound();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-indigo-500/30 p-6 text-white shadow-2xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full"
        >
          ✕
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Nörolojik Odak & Dikkat Egzersizi</span>
          </div>
          <h3 className="text-2xl font-black">Zihin & Odaklanma Testi</h3>
          <p className="text-xs text-indigo-200 mt-1 max-w-xs mx-auto">
            Kural: Kelimenin anlamına değil, <strong className="text-amber-300 underline">yazıldığı rengin adına</strong> tıkla!
          </p>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between w-full max-w-xs mb-6 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Timer className="w-4 h-4" />
            <span>{timeLeft} sn</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Trophy className="w-4 h-4" />
            <span>Skor: {score}</span>
          </div>
        </div>

        {/* Word Display Area */}
        {isActive ? (
          <div
            className={`w-full py-12 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 transition-all ${
              feedback === 'correct' ? 'ring-4 ring-emerald-500/50' : feedback === 'wrong' ? 'ring-4 ring-rose-500/50' : ''
            }`}
          >
            <span
              className="text-4xl sm:text-5xl font-black tracking-widest transition-transform transform active:scale-95"
              style={{ color: inkColor.hex }}
            >
              {targetWord.name}
            </span>
          </div>
        ) : isFinished ? (
          <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10 w-full mb-6 space-y-2">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-xl font-bold">Süre Doldu!</h4>
            <p className="text-sm text-indigo-200">
              Toplam Odak Puanın: <strong className="text-white text-lg">{score}</strong>
            </p>
            <p className="text-xs text-slate-400">
              Bu egzersiz sınav anındaki dikkat dağıtıcıları eleme yeteneğini güçlendirir.
            </p>
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-white/5 rounded-3xl border border-white/10 w-full mb-6">
            <p className="text-sm text-indigo-200 mb-3">
              Beynini sınav öncesi en yüksek konsantrasyona ayarlamak için hazır mısın?
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 cursor-pointer"
            >
              Testi Başlat (30 Saniye)
            </button>
          </div>
        )}

        {/* Color Buttons */}
        {isActive && (
          <div className="grid grid-cols-5 gap-2 w-full max-w-sm mb-4">
            {COLORS.map((col) => (
              <button
                key={col.name}
                onClick={() => handleColorClick(col)}
                className="py-3 px-1 rounded-2xl text-[11px] font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer text-center"
                style={{ backgroundColor: col.hex }}
              >
                {col.name}
              </button>
            ))}
          </div>
        )}

        {isFinished && (
          <button
            onClick={startGame}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tekrar Dene</span>
          </button>
        )}
      </div>
    </div>
  );
};

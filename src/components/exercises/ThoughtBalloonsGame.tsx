import React, { useState, useEffect } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Sparkles, Trophy, RotateCcw, CheckCircle2, Zap } from 'lucide-react';

interface ThoughtBalloonsGameProps {
  currentStudent: Student | null;
  onClose: () => void;
}

interface BalloonItem {
  id: number;
  negative: string;
  positive: string;
  color: string;
  popped: boolean;
  x: number; // percentage
  speed: number;
}

const BALLOON_PRESETS = [
  {
    negative: "Sınavda her şeyi unutacağım!",
    positive: "Bilgilerim hafızamda güvenle kayıtlı; sakinleştikçe hepsi adım adım aklıma gelecek.",
    color: "from-rose-500 to-pink-600"
  },
  {
    negative: "Zamanım kesin yetmeyecek!",
    positive: "Turlama tekniğiyle önce kolay soruları çözüp zamanımı bilinçli yöneteceğim.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    negative: "Herkes benden daha zeki ve hazır!",
    positive: "Benim tek rakibim dünkü kendim; verdiğim emeğin karşılığını alacağıma inanıyorum.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    negative: "Ya sınavda donup kalırsam?",
    positive: "Donduğumu hissedersem kalemi bırakır, 3 derin nefes alır ve kaldığım yerden devam ederim.",
    color: "from-amber-500 to-orange-600"
  },
  {
    negative: "Bu sınav hayatımın son şansı!",
    positive: "Sınav sadece bir kilometre taşıdır; benim değerimi ve geleceğimi tek başına belirleyemez.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    negative: "Ailemin beklentilerini boşa çıkaracağım!",
    positive: "Ailem beni puanım için değil, ben olduğum için seviyor. Elimden gelenin en iyisini yapıyorum.",
    color: "from-fuchsia-500 to-rose-600"
  },
  {
    negative: "İlk soruyu yapamadım, bittim!",
    positive: "Sınav bir maratondur; zor bir soru sadece bir sonraki kolay sorunun habercisidir.",
    color: "from-violet-500 to-indigo-700"
  }
];

export const ThoughtBalloonsGame: React.FC<ThoughtBalloonsGameProps> = ({ currentStudent, onClose }) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [lastReframed, setLastReframed] = useState<{ negative: string; positive: string } | null>(null);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [poppedCount, setPoppedCount] = useState<number>(0);

  const startNewGame = () => {
    const initial = BALLOON_PRESETS.map((preset, index) => ({
      id: index + 1,
      negative: preset.negative,
      positive: preset.positive,
      color: preset.color,
      popped: false,
      x: 10 + (index % 4) * 22,
      speed: 1 + Math.random() * 0.5
    }));
    setBalloons(initial);
    setScore(0);
    setPoppedCount(0);
    setLastReframed(null);
    setGameActive(true);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handlePopBalloon = (balloon: BalloonItem) => {
    if (balloon.popped) return;

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    setScore((s) => s + 20);
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);
    setLastReframed({ negative: balloon.negative, positive: balloon.positive });

    if (newCount === BALLOON_PRESETS.length) {
      setGameActive(false);
      if (currentStudent) {
        logExerciseCompletion({
          studentNumber: currentStudent.studentNumber,
          exerciseType: 'thought_balloons',
          exerciseTitle: 'Kaygı Kovucu Düşünce Balonları Oyunu',
          durationSeconds: 45,
          score: 140
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 text-white rounded-3xl border border-indigo-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎈</span>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Kaygı Kovucu Balon Patlatma</h3>
              <p className="text-xs text-white/80">Olumsuz sınav düşüncelerine tıkla, onları güç veren gerçeklere dönüştür!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>{score} Puan</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {/* Latest reframed thought banner */}
          {lastReframed && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40 text-xs sm:text-sm animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-rose-300 line-through font-medium">
                <span>Olumsuz:</span> {lastReframed.negative}
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold mt-1 text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Güçlü Gerçek: {lastReframed.positive}</span>
              </div>
            </div>
          )}

          {/* Balloon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {balloons.map((balloon) => (
              <button
                key={balloon.id}
                disabled={balloon.popped}
                onClick={() => handlePopBalloon(balloon)}
                className={`relative p-4 rounded-3xl text-left transition-all duration-300 cursor-pointer overflow-hidden border flex flex-col justify-between min-h-[140px] group ${
                  balloon.popped
                    ? 'bg-slate-800/40 border-slate-700/50 opacity-40 scale-95 pointer-events-none'
                    : `bg-gradient-to-br ${balloon.color} border-white/20 hover:scale-[1.03] shadow-lg hover:shadow-xl`
                }`}
              >
                {!balloon.popped ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">💭</span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full text-white/90">
                        Kaygıyı Patlat
                      </span>
                    </div>

                    <p className="font-bold text-xs sm:text-sm text-white drop-shadow-sm mt-2">
                      "{balloon.negative}"
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-white/80 font-semibold mt-3 pt-2 border-t border-white/10 group-hover:text-white">
                      <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                      <span>Tıkla ve Gerçeği Keşfet!</span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-1" />
                    <span className="text-xs font-bold text-emerald-300">Yeniden Çerçevelendi!</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Game Over Screen */}
          {!gameActive && (
            <div className="text-center p-6 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 rounded-3xl border border-indigo-400/30 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-400/30">
                🏆
              </div>
              <h4 className="text-xl font-black text-white">Tebrikler, Tüm Kaygıları Dönüştürdün!</h4>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-md mx-auto">
                Zihnindeki olumsuz felaket senaryolarını fark edip onları rasyonel ve güçlü gerçeklerle yer değiştirdin.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={startNewGame}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tekrar Oyna</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

interface MemoryZenGameProps {
  currentStudent: Student | null;
  onClose: () => void;
}

interface CardItem {
  id: number;
  emoji: string;
  word: string;
  matched: boolean;
}

const ICONS = [
  { emoji: '🌿', word: 'Huzur' },
  { emoji: '🎯', word: 'Odak' },
  { emoji: '⭐', word: 'İnanç' },
  { emoji: '💡', word: 'Akıl' },
  { emoji: '🕊️', word: 'Sakinlik' },
  { emoji: '🌊', word: 'Akış' }
];

export const MemoryZenGame: React.FC<MemoryZenGameProps> = ({ currentStudent, onClose }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchedCount, setMatchedCount] = useState<number>(0);

  const initGame = () => {
    const deck = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        emoji: item.emoji,
        word: item.word,
        matched: false
      }));
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setMatchedCount(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || cards[index].matched || flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].word === cards[second].word) {
        // match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === first || i === second ? { ...c, matched: true } : c))
          );
          setFlipped([]);
          setMatchedCount((c) => {
            const next = c + 1;
            if (next === ICONS.length && currentStudent) {
              logExerciseCompletion({
                studentNumber: currentStudent.studentNumber,
                exerciseType: 'memory_cards',
                exerciseTitle: 'Zihin Dinlendirici Eşleştirme Oyunu',
                durationSeconds: 40,
                score: 100
              });
            }
            return next;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  const isCompleted = matchedCount === ICONS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-indigo-500/30 p-6 text-white shadow-2xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full"
        >
          ✕
        </button>

        <div className="text-center mb-5">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-2">
            Hafıza ve Zihinsel Mola
          </span>
          <h3 className="text-2xl font-black">Zen Eşleştirme Oyunu</h3>
          <p className="text-xs text-indigo-200 mt-1">
            Rahatlatıcı kavramları eşleştirerek sınav stresinden uzaklaş.
          </p>
        </div>

        <div className="flex justify-between w-full max-w-xs mb-4 text-xs font-bold px-3 py-2 bg-white/5 rounded-xl border border-white/10">
          <span>Hamle: {moves}</span>
          <span className="text-emerald-400">Eşleşen: {matchedCount} / {ICONS.length}</span>
        </div>

        {!isCompleted ? (
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-xs mb-4">
            {cards.map((c, i) => {
              const isFlipped = flipped.includes(i) || c.matched;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCardClick(i)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 font-bold text-center transition-all duration-300 cursor-pointer ${
                    isFlipped
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/30 text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 border border-white/10 text-transparent'
                  }`}
                >
                  {isFlipped ? (
                    <>
                      <span className="text-2xl">{c.emoji}</span>
                      <span className="text-[9px] tracking-tight mt-0.5">{c.word}</span>
                    </>
                  ) : (
                    <span className="text-xs text-indigo-300 font-mono">?</span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-xl font-bold">Harika Hafıza!</h4>
            <p className="text-xs text-indigo-200">
              Tüm huzur kartlarını {moves} hamlede eşleştirdin.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={initGame}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Tekrar Oyna
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

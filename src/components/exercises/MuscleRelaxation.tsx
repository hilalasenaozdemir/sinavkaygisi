import React, { useState, useEffect } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Activity, Play, RotateCcw, CheckCircle2, ChevronRight } from 'lucide-react';

interface MuscleRelaxationProps {
  currentStudent: Student | null;
  onClose: () => void;
}

const MUSCLE_STEPS = [
  {
    name: 'Eller & Kollar',
    instruction: 'Yumruklarını sıkıca sık, kollarını gerginleştir. 5 saniye bekle...',
    releaseInstruction: 'Şimdi aniden bırak! Parmaklarının ucuna kadar yayılan ılık gevşemeyi hisset.',
    duration: 10
  },
  {
    name: 'Omuzlar & Boyun',
    instruction: 'Omuzlarını kulaklarına doğru mümkün olduğunca yukarı çek ve gergin tut...',
    releaseInstruction: 'Şimdi omuzlarını aşağı düşür, tüm sınav yükünün aktığını hisset.',
    duration: 10
  },
  {
    name: 'Yüz & Çene Kasları',
    instruction: 'Kaşlarını çat, dişlerini hafifçe sık, yüzünü buruştur...',
    releaseInstruction: 'Bütün yüz kaslarını serbest bırak. Alnının pürüzsüzleştiğini fark et.',
    duration: 10
  },
  {
    name: 'Karın & Sırt',
    instruction: 'Karnını içine çekip göğsünü ger. Nefesini hafifçe tut...',
    releaseInstruction: 'Derin bir nefes vererek tüm gerginliği dışarı üfle. Bedenin koltuğa gömülsün.',
    duration: 10
  },
  {
    name: 'Bacaklar & Ayaklar',
    instruction: 'Ayak parmaklarını kendine doğru çek, bacak kaslarını sıkılaştır...',
    releaseInstruction: 'Tamamen gevşet. Ayak tabanlarından yere akan ağırlığı fark et.',
    duration: 10
  }
];

export const MuscleRelaxation: React.FC<MuscleRelaxationProps> = ({ currentStudent, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'tense' | 'release'>('tense');
  const [seconds, setSeconds] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  const currentMuscle = MUSCLE_STEPS[currentIdx];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) return prev - 1;

          // Switch phase
          if (phase === 'tense') {
            setPhase('release');
            return 5;
          } else {
            // Next muscle or finish
            if (currentIdx < MUSCLE_STEPS.length - 1) {
              setCurrentIdx((i) => i + 1);
              setPhase('tense');
              return 5;
            } else {
              setIsRunning(false);
              setIsFinished(true);
              if (currentStudent) {
                logExerciseCompletion({
                  studentNumber: currentStudent.studentNumber,
                  exerciseType: 'muscle_relax',
                  exerciseTitle: 'Aşamalı Kas Gevşetme (PMR)',
                  durationSeconds: 60,
                  score: 100
                });
              }
              return 0;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, phase, currentIdx, currentStudent]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-indigo-500/30 p-6 sm:p-8 text-white shadow-2xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30 inline-block mb-2">
            Bedensel Stres Çözücü
          </span>
          <h3 className="text-2xl font-black">Aşamalı Kas Gevşetme (PMR)</h3>
          <p className="text-xs text-indigo-200 mt-1">
            Kaslarını önce bilinçli sıkıp ardından gevşeterek fiziksel stres döngüsünü kır.
          </p>
        </div>

        {!isFinished ? (
          <div className="w-full space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-indigo-400/30 text-center space-y-4">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                Bölge {currentIdx + 1} / {MUSCLE_STEPS.length}: {currentMuscle.name}
              </span>

              <div
                className={`w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center font-bold transition-all duration-500 ${
                  phase === 'tense'
                    ? 'bg-rose-500/30 border-4 border-rose-400 text-rose-200 scale-105 animate-pulse'
                    : 'bg-emerald-500/30 border-4 border-emerald-400 text-emerald-200 scale-95'
                }`}
              >
                <span className="text-3xl font-black font-mono">{seconds}</span>
                <span className="text-xs uppercase font-bold mt-1">
                  {phase === 'tense' ? 'SIK & GER' : 'SERBEST BIRAK'}
                </span>
              </div>

              <p className="text-sm font-semibold text-white/90">
                {phase === 'tense' ? currentMuscle.instruction : currentMuscle.releaseInstruction}
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {!isRunning ? (
                <button
                  onClick={() => setIsRunning(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/25"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{currentIdx > 0 ? 'Devam Et' : 'Gevşemeyi Başlat'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(false)}
                  className="px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs"
                >
                  Duraklat
                </button>
              )}

              <button
                onClick={() => {
                  setIsRunning(false);
                  setCurrentIdx(0);
                  setPhase('tense');
                  setSeconds(5);
                  setIsFinished(false);
                }}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold">Tüm Kasların Gevşedi!</h4>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-sm mx-auto">
              Bedenindeki gerginlik azaldığında zihnin de doğal olarak berraklaşır.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

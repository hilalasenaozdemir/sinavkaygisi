import React, { useState } from 'react';
import { logExerciseCompletion, Student } from '../../data/storage';
import { Eye, Hand, Volume2, Flower2, Heart, CheckCircle2 } from 'lucide-react';

interface Grounding54321Props {
  currentStudent: Student | null;
  onClose: () => void;
}

const STEPS = [
  {
    step: 5,
    title: '5 Gördüğün Nesne',
    prompt: 'Şu anda etrafında gördüğün 5 farklı nesneye dikkatle bak (örneğin: saat, silgi, pencere, kalem, lamba).',
    icon: Eye,
    color: 'from-blue-500 to-cyan-500',
    example: 'Gözlerinle nesnelerin renklerini ve şekillerini detaylıca tara.'
  },
  {
    step: 4,
    title: '4 Dokunabildiğin Doku',
    prompt: 'Fiziksel olarak dokunabileceğin veya temasını hissettiğin 4 şeyi fark et (örneğin: masanın serin yüzeyi, tişörtünün kumaşı, ayaklarının yerdeki ağırlığı).',
    icon: Hand,
    color: 'from-emerald-500 to-teal-500',
    example: 'Dokunma hissi beynin panik merkezini doğrudan yatıştırır.'
  },
  {
    step: 3,
    title: '3 Duyduğun Ses',
    prompt: 'Kulağına gelen 3 farklı sese odaklan (örneğin: uzaktan gelen bir uğultu, saatin tıkırtısı, nefesinin sesi).',
    icon: Volume2,
    color: 'from-amber-500 to-orange-500',
    example: 'Dış sesleri yargılamadan sadece birer nota gibi dinle.'
  },
  {
    step: 2,
    title: '2 Kokladığın Koku',
    prompt: 'Burnuna gelen 2 kokuyu fark et veya seni rahatlatan 2 kokuyu zihninde canlandır (örneğin: taze kahve, yağmur sonrası toprak).',
    icon: Flower2,
    color: 'from-purple-500 to-indigo-500',
    example: 'Koku duyusu hafıza ve duyguları en hızlı dengeleyen duyudur.'
  },
  {
    step: 1,
    title: '1 Kendinde Sevdiğin Özellik',
    prompt: 'Bugün kendinde takdir ettiğin, seni güçlü kılan 1 özelliğini veya başarıyla aştığın bir anı hatırla.',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    example: 'Sen bir sınav puanından çok daha fazlasısın. Elinden gelenin en iyisini yapıyorsun.'
  }
];

export const Grounding54321: React.FC<Grounding54321Props> = ({ currentStudent, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = STEPS[currentStepIndex];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      if (currentStudent) {
        logExerciseCompletion({
          studentNumber: currentStudent.studentNumber,
          exerciseType: 'grounding',
          exerciseTitle: '5-4-3-2-1 Duyusal Topraklanma Egzersizi',
          durationSeconds: 120,
          score: 100
        });
      }
    }
  };

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
          <span className="text-xs uppercase font-bold tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30 inline-block mb-2">
            Anlık Panik ve Kaygı Kesici
          </span>
          <h3 className="text-2xl font-black">5-4-3-2-1 Topraklanma</h3>
          <p className="text-xs text-indigo-200 mt-1">
            Zihnini geçmişin pişmanlıklarından ve geleceğin sınav korkusundan tam şu ana getir.
          </p>
        </div>

        {!completed ? (
          <div className="w-full space-y-6">
            {/* Step Card */}
            <div className={`p-6 rounded-3xl bg-gradient-to-br ${step.color} shadow-xl text-white space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <StepIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black font-mono bg-white/20 px-3 py-1 rounded-2xl">
                  {step.step}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-sm text-white/95 mt-2 leading-relaxed">
                  {step.prompt}
                </p>
              </div>

              <div className="p-3 bg-black/20 rounded-2xl text-xs text-white/90 italic">
                💡 İpucu: {step.example}
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex justify-center gap-2">
              {STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-8 bg-teal-400'
                      : idx < currentStepIndex
                      ? 'w-3 bg-white/60'
                      : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 px-4 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-lg hover:bg-slate-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{currentStepIndex === STEPS.length - 1 ? 'Egzersizi Tamamla' : 'Sıradaki Duyusal Adım'}</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold">Harika! Şimdi Buradasın ve Güvendesin.</h4>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-sm mx-auto leading-relaxed">
              Duyuların sayesinde zihnini panik döngüsünden çıkardın. Omuzlarını hafifçe salla ve derin bir nefes alarak yoluna devam et.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setCompleted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Tekrar Uygula
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Tamam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

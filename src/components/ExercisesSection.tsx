import React, { useState } from 'react';
import { Student } from '../types';
import { BreathingExercise } from './exercises/BreathingExercise';
import { ThoughtBalloonsGame } from './exercises/ThoughtBalloonsGame';
import { StroopFocusGame } from './exercises/StroopFocusGame';
import { Grounding54321 } from './exercises/Grounding54321';
import { MuscleRelaxation } from './exercises/MuscleRelaxation';
import { MemoryZenGame } from './exercises/MemoryZenGame';
import {
  Wind,
  Sparkles,
  Target,
  Hand,
  Activity,
  Brain,
  Play,
  Flame,
  Gamepad2
} from 'lucide-react';

interface ExercisesSectionProps {
  currentStudent: Student | null;
  onRefreshData?: () => void;
}

export const ExercisesSection: React.FC<ExercisesSectionProps> = ({ currentStudent, onRefreshData }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleClose = () => {
    setActiveModal(null);
    if (onRefreshData) onRefreshData();
  };

  const EXERCISES_LIST = [
    {
      id: 'breathing',
      name: 'Rehberli Nefes Egzersizi',
      badge: 'Fizyolojik Sakinleşme',
      subtitle: '4x4 Kutu Nefesi ve 4-7-8 Tekniği ile Nabzı Düşür',
      description: 'Görsel dairenin nefes alışveriş ritmini takip ederek sınav anındaki çarpıntı ve gerginliği 2 dakikada yatıştır.',
      icon: Wind,
      color: {
        bg: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600',
        cardBorder: 'hover:border-teal-400',
        badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
        btnBg: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        shadow: 'shadow-emerald-500/20'
      }
    },
    {
      id: 'balloons',
      name: 'Kaygı Kovucu Düşünce Balonları',
      badge: 'Popüler Oyun',
      subtitle: 'Olumsuz Otomatik Düşünceleri Patlatıp Gerçeğe Çevir',
      description: '"Yapamayacağım", "Unutacağım" gibi sınav kaygısı balonlarına tıkla, patlat ve güçlendirici alternatiflerle zihnini resetle.',
      icon: Gamepad2,
      color: {
        bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600',
        cardBorder: 'hover:border-rose-400',
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        btnBg: 'bg-rose-500 hover:bg-rose-600 text-white',
        shadow: 'shadow-rose-500/20'
      }
    },
    {
      id: 'stroop',
      name: 'Zihin & Odaklanma Stroop Oyunu',
      badge: 'Dikkat Güçlendirici',
      subtitle: 'Prefrontal Korteks Hızlandırıcı ve Konsantrasyon Testi',
      description: 'Kelimenin anlamına aldanmadan mürekkep rengini bularak sınav öncesi dikkatini zirveye taşı.',
      icon: Target,
      color: {
        bg: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600',
        cardBorder: 'hover:border-blue-400',
        badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
        btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        shadow: 'shadow-indigo-500/20'
      }
    },
    {
      id: 'grounding',
      name: '5-4-3-2-1 Topraklanma Egzersizi',
      badge: 'Panik & Şok Durdurucu',
      subtitle: 'Duyuları Kullanarak Zihni Anında Şu Ana Çek',
      description: '5 gördüğün, 4 dokunduğun, 3 duyduğun, 2 kokladığın ve 1 kendine inandığın adımla panik atağı engelle.',
      icon: Hand,
      color: {
        bg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500',
        cardBorder: 'hover:border-amber-400',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        btnBg: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black',
        shadow: 'shadow-amber-500/20'
      }
    },
    {
      id: 'muscle',
      name: 'Aşamalı Kas Gevşetme (PMR)',
      badge: 'Beden Rahatlatıcı',
      subtitle: 'Omuz, Boyun ve Çene Gerginliğini Serbest Bırak',
      description: 'Kas gruplarını sırayla gerip gevşeterek fiziksel stres birikimini ve baş ağrılarını hafiflet.',
      icon: Activity,
      color: {
        bg: 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700',
        cardBorder: 'hover:border-purple-400',
        badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
        btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
        shadow: 'shadow-purple-500/20'
      }
    },
    {
      id: 'memory',
      name: 'Zen Hafıza Eşleştirme Oyunu',
      badge: 'Zihinsel Mola',
      subtitle: 'Huzur ve Odak Sembolleriyle Beynini Dinlendir',
      description: 'Kısa bir ders molasında zihnini sakinleştirici pozitif kavram kartlarıyla tazele.',
      icon: Brain,
      color: {
        bg: 'bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-600',
        cardBorder: 'hover:border-cyan-400',
        badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        btnBg: 'bg-cyan-600 hover:bg-cyan-700 text-white',
        shadow: 'shadow-cyan-500/20'
      }
    }
  ];

  return (
    <div id="exercises-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
              🎮
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Sınav Kaygısı Oyunları ve Egzersizleri
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            İstediğin egzersize tıklayıp hemen başlayabilir, sınav stresini eğlenceli ve bilimsel yollarla yönetebilirsin
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/80 self-start">
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          <span>Canlı & İnteraktif Alan</span>
        </div>
      </div>

      {/* Grid of Colorful Aesthetic Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXERCISES_LIST.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${item.color.cardBorder} hover:-translate-y-1`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.color.bg} text-white flex items-center justify-center shadow-md ${item.color.shadow} group-hover:scale-110 transition-transform`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border ${item.color.badgeBg}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Name & Subtitle */}
                <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 mb-2.5">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Start Button */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  Uygulama Süresi: ~2-3 dk
                </span>

                <button
                  id={`start-exercise-${item.id}`}
                  onClick={() => setActiveModal(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer ${item.color.btnBg}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Başla</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Render Active Exercise Modals */}
      {activeModal === 'breathing' && (
        <BreathingExercise currentStudent={currentStudent} onClose={handleClose} />
      )}
      {activeModal === 'balloons' && (
        <ThoughtBalloonsGame currentStudent={currentStudent} onClose={handleClose} />
      )}
      {activeModal === 'stroop' && (
        <StroopFocusGame currentStudent={currentStudent} onClose={handleClose} />
      )}
      {activeModal === 'grounding' && (
        <Grounding54321 currentStudent={currentStudent} onClose={handleClose} />
      )}
      {activeModal === 'muscle' && (
        <MuscleRelaxation currentStudent={currentStudent} onClose={handleClose} />
      )}
      {activeModal === 'memory' && (
        <MemoryZenGame currentStudent={currentStudent} onClose={handleClose} />
      )}
    </div>
  );
};

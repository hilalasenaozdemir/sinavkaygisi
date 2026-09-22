import React, { useState } from 'react';
import { INITIAL_MODULES } from '../data/modules';
import { getModuleLinks, submitHomework, Student } from '../data/storage';
import { EducationalModule } from '../types';
import {
  BookOpen,
  ExternalLink,
  Send,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

interface ModulesSectionProps {
  currentStudent: Student | null;
  onOpenAuthModal: () => void;
  onHomeworkSubmitted?: () => void;
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({
  currentStudent,
  onOpenAuthModal,
  onHomeworkSubmitted
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [appliedActivity, setAppliedActivity] = useState<string>('');
  const [reflectionText, setReflectionText] = useState<string>('');
  const [feelingBefore, setFeelingBefore] = useState<string>('7 (Orta-Yüksek)');
  const [feelingAfter, setFeelingAfter] = useState<string>('3 (Sakin)');
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const moduleLinks = getModuleLinks();
  const currentModule: EducationalModule =
    INITIAL_MODULES.find((m) => m.id === activeModuleId) || INITIAL_MODULES[0];

  const targetLink = moduleLinks[currentModule.id] || currentModule.externalUrl || 'https://www.meb.gov.tr';

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) {
      onOpenAuthModal();
      return;
    }

    if (!appliedActivity.trim() || !reflectionText.trim()) {
      alert('Lütfen uyguladığınız aktiviteyi ve düşüncelerinizi yazınız.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitHomework({
        studentNumber: currentStudent.studentNumber,
        studentName: currentStudent.fullName,
        moduleId: currentModule.id,
        moduleTitle: currentModule.title,
        answers: {
          appliedActivity,
          reflectionText,
          selfFeelingBefore: feelingBefore,
          selfFeelingAfter: feelingAfter
        }
      });

      setIsSubmitting(false);
      setSubmitStatus('Ödeviniz başarıyla sisteme kaydedildi! Öğretmeniniz sonuçları öğretmen panelinde değerlendirecektir.');
      setAppliedActivity('');
      setReflectionText('');
      if (onHomeworkSubmitted) onHomeworkSubmitted();

      setTimeout(() => setSubmitStatus(''), 6000);
    }, 400);
  };

  return (
    <div id="modules-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              📚
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Eğitim ve Gelişim Modülleri
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Sınav kaygısını adım adım yönetmeyi sağlayan 6 ana çalışma modülü
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start">
          <Info className="w-3.5 h-3.5 text-indigo-500" />
          <span>Bağlantılar öğretmeniniz tarafından güncellenebilir</span>
        </div>
      </div>

      {/* 6 Tabs as explicitly requested */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {INITIAL_MODULES.map((mod) => {
          const isActive = mod.id === activeModuleId;
          return (
            <button
              id={`tab-module-${mod.id}`}
              key={mod.id}
              onClick={() => {
                setActiveModuleId(mod.id);
                setSubmitStatus('');
              }}
              className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer group flex flex-col justify-between min-h-[92px] ${
                isActive
                  ? `${mod.color.bg} text-white shadow-lg scale-[1.02] border-transparent`
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {mod.id}. Modül
                </span>
                <span className={`text-xs ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  →
                </span>
              </div>

              <div className="mt-2">
                <p className={`text-xs font-bold line-clamp-2 leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {mod.title.split(':')[1]?.trim() || mod.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Detailed Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
        {/* Module Header Banner */}
        <div className={`p-6 sm:p-8 ${currentModule.color.bg} text-white relative overflow-hidden`}>
          <div className="relative z-10 max-w-3xl space-y-2">
            <span className="inline-block text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
              {currentModule.id}. Modül Rehberlik Dokümanı
            </span>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              {currentModule.title}
            </h3>
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              {currentModule.subtitle}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 relative z-10">
            <a
              id={`open-link-module-${currentModule.id}`}
              href={targetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 shadow-md hover:scale-105 transition-all"
            >
              <span>Öğretmenin Eklediği Bağlantıyı Aç</span>
              <ExternalLink className="w-4 h-4 text-indigo-600" />
            </a>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/20 backdrop-blur-md text-xs text-white/90 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Etkileşimli Ödev & Uygulama Alanı</span>
            </div>
          </div>
        </div>

        {/* Module Content & Homework Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Topics & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                Modül Genel Bakışı
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Kapsanan Konu Başlıkları
              </h4>
              <div className="space-y-2.5">
                {currentModule.topics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Link Notice */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">Öğretmen Kaynak Bağlantısı:</span>
                <p className="text-indigo-800 break-all font-mono text-[11px]">
                  {targetLink}
                </p>
                <p className="text-[11px] text-indigo-600/80">
                  Öğretmeniniz dilediğinde bu bağlantıyı sol taraftaki panelden değiştirebilir.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Homework Application & Submission Form */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-5 sm:p-6 rounded-3xl border border-indigo-100/80 shadow-inner flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Modül Uygulama Ödevi</h4>
                    <span className="text-[11px] text-slate-500">Öğretmen Değerlendirmesi</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Gizli Puanlama
                </span>
              </div>

              {/* Student status warning */}
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Ödevinizi teslim ettikten sonra uyguladığınızı görebileceksiniz; puan ve öğretmen notu öğretmen panelinde kalacaktır.
                </span>
              </div>

              <form onSubmit={handleSubmitHomework} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. Uygulama Görevi *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
                    {currentModule.homeworkPrompt}
                  </p>
                  <textarea
                    required
                    rows={2}
                    value={appliedActivity}
                    onChange={(e) => setAppliedActivity(e.target.value)}
                    placeholder="Uyguladığınız yöntemi veya gözleminizi buraya yazınız..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    2. Kişisel Gözlem ve Yansıtma *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
                    {currentModule.reflectionPrompt}
                  </p>
                  <textarea
                    required
                    rows={2}
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="Deneyiminiz sonrası hissettiklerinizi yazınız..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Önceki Kaygı:
                    </label>
                    <select
                      value={feelingBefore}
                      onChange={(e) => setFeelingBefore(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="10 (Aşırı Panik)">10 (Aşırı Panik)</option>
                      <option value="8 (Çok Kaygılı)">8 (Çok Kaygılı)</option>
                      <option value="7 (Orta-Yüksek)">7 (Orta-Yüksek)</option>
                      <option value="5 (Orta Düzey)">5 (Orta Düzey)</option>
                      <option value="3 (Hafif)">3 (Hafif)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Sonraki Durum:
                    </label>
                    <select
                      value={feelingAfter}
                      onChange={(e) => setFeelingAfter(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="6 (Daha İyi)">6 (Daha İyi)</option>
                      <option value="4 (Rahatlamış)">4 (Rahatlamış)</option>
                      <option value="3 (Sakin)">3 (Sakin)</option>
                      <option value="2 (Çok Rahat)">2 (Çok Rahat)</option>
                      <option value="1 (Dingin Zihin)">1 (Dingin Zihin)</option>
                    </select>
                  </div>
                </div>

                {submitStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{submitStatus}</span>
                  </div>
                )}

                <div className="pt-1">
                  {currentStudent ? (
                    <button
                      id="submit-homework-button"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Kaydediliyor...' : 'Ödevi Tamamla ve Öğretmene Gönder'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenAuthModal}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Ödev Göndermek İçin Öğrenci Girişi Yap</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { getStoredSubmissions, Student } from '../data/storage';
import { FileCheck, ShieldAlert, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface StudentAssignmentsViewProps {
  currentStudent: Student | null;
  onOpenAuthModal: () => void;
}

export const StudentAssignmentsView: React.FC<StudentAssignmentsViewProps> = ({
  currentStudent,
  onOpenAuthModal
}) => {
  if (!currentStudent) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <FileCheck className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Ödevlerinizi Görmek İçin Giriş Yapın</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Uyguladığınız modül ödevlerinin durumunu ve teslim kayıtlarınızı takip etmek için öğrenci numaranızla giriş yapınız.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all cursor-pointer"
        >
          Öğrenci Girişi Yap
        </button>
      </div>
    );
  }

  const allSubmissions = getStoredSubmissions();
  const mySubmissions = allSubmissions.filter((s) => s.studentNumber === currentStudent.studentNumber);

  return (
    <div id="student-assignments-view" className="space-y-4">
      {/* Information Banner on Grade Privacy */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold block text-amber-950">Ödev Değerlendirme & Sonuç Gizlilik Bildirimi:</span>
          <p className="text-amber-800 leading-relaxed">
            Burada uyguladığınız ve teslim ettiğiniz tüm ödevlerinizi görebilirsiniz. Sınav kaygısı değerlendirme ilkeleri gereğince, ödevinizin <strong>puanı ve detaylı sonuç değerlendirmesi yalnızca öğretmeninizin ekranında</strong> yer almaktadır.
          </p>
        </div>
      </div>

      {mySubmissions.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
          Henüz teslim edilmiş bir ödeviniz bulunmuyor. Yukarıdaki modüllerden birini seçip ödevinizi uygulayabilirsiniz.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mySubmissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-indigo-600 block">
                    {sub.moduleTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Teslim Tarihi: {new Date(sub.submittedAt).toLocaleDateString('tr-TR')} {new Date(sub.submittedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Uygulandı & İletildi</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                <div>
                  <span className="font-bold text-slate-700">Uyguladığınız Aktivite: </span>
                  <p className="text-slate-600 mt-0.5">{sub.answers.appliedActivity}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-700">Kişisel Deneyiminiz: </span>
                  <p className="text-slate-600 italic mt-0.5">"{sub.answers.reflectionText}"</p>
                </div>
              </div>

              {/* Locked grade notice for student */}
              <div className="p-2.5 bg-slate-100/80 rounded-xl text-[11px] text-slate-500 font-medium flex items-center justify-between border border-slate-200/60">
                <span className="flex items-center gap-1.5">
                  <span>🔒</span> Sonuç ve Not:
                </span>
                <span className="font-bold text-slate-700">
                  Öğretmen İncelemesinde
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

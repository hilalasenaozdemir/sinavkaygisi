import React, { useState } from 'react';
import {
  getStoredStudents,
  getStoredSubmissions,
  gradeSubmission,
  getStoredExercises,
  getModuleLinks,
  saveModuleLink,
  verifyTeacherPassword,
  Student
} from '../data/storage';
import { INITIAL_MODULES } from '../data/modules';
import { HomeworkSubmission, ExerciseSession } from '../types';
import {
  ShieldCheck,
  Lock,
  Users,
  FileCheck,
  Link2,
  Activity,
  CheckCircle,
  ExternalLink,
  Award,
  KeyRound,
  Eye,
  LogOut,
  Clock,
  Save,
  MessageSquare
} from 'lucide-react';

interface TeacherAreaProps {
  isTeacherAuthenticated: boolean;
  onTeacherLogin: () => void;
  onTeacherLogout: () => void;
  onRefreshData?: () => void;
}

export const TeacherArea: React.FC<TeacherAreaProps> = ({
  isTeacherAuthenticated,
  onTeacherLogin,
  onTeacherLogout,
  onRefreshData
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'students' | 'links' | 'exercises'>('submissions');

  // Grading modal state
  const [selectedSub, setSelectedSub] = useState<HomeworkSubmission | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Module links editing state
  const [moduleLinks, setModuleLinks] = useState<Record<number, string>>(() => getModuleLinks());
  const [linkSaveStatus, setLinkSaveStatus] = useState<string>('');

  const students = getStoredStudents();
  const submissions = getStoredSubmissions();
  const exercises = getStoredExercises();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyTeacherPassword(passwordInput)) {
      onTeacherLogin();
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Hatalı öğretmen şifresi! (Varsayılan: ogretmen123)');
    }
  };

  const handleQuickUnlock = () => {
    setPasswordInput('ogretmen123');
    onTeacherLogin();
  };

  const handleOpenGradeModal = (sub: HomeworkSubmission) => {
    setSelectedSub(sub);
    setScoreInput(sub.teacherScore ?? 85);
    setFeedbackInput(sub.teacherFeedback ?? '');
    setSaveSuccessMsg('');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    gradeSubmission(selectedSub.id, scoreInput, feedbackInput);
    setSaveSuccessMsg('Ödev başarıyla puanlandı ve kaydedildi! (Öğrenci bu puanı göremez, sadece öğretmen arşivinde tutulur)');
    
    if (onRefreshData) onRefreshData();
    setTimeout(() => {
      setSelectedSub(null);
    }, 1500);
  };

  const handleSaveLink = (moduleId: number) => {
    const url = moduleLinks[moduleId];
    saveModuleLink(moduleId, url);
    setLinkSaveStatus(`${moduleId}. Modül bağlantısı başarıyla güncellendi!`);
    setTimeout(() => setLinkSaveStatus(''), 3000);
  };

  // If not logged in as teacher, show password unlock box
  if (!isTeacherAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Öğretmen & Yönetici Girişi</h3>
            <p className="text-xs text-indigo-200/80">Sonuçları inceleme ve modül link yönetimi</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4 backdrop-blur-sm">
          <p className="text-xs text-indigo-200 mb-3 leading-relaxed">
            Öğrencilerin uyguladıkları ödevlerin gizli sonuçları, notları ve modül linkleri sadece bu alanda yönetilir.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-indigo-300" />
                <input
                  type="password"
                  placeholder="Öğretmen Şifresi (ogretmen123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/30 border border-indigo-400/30 rounded-xl text-xs text-white placeholder-indigo-300/50 focus:outline-none focus:border-amber-400"
                />
              </div>
              {passwordError && (
                <p className="text-[11px] text-rose-400 mt-1 font-medium">{passwordError}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-bold text-xs text-white shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" /> Giriş Yap
              </button>
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-indigo-200 transition-all cursor-pointer"
                title="Tek tıkla öğretmen paneline geçiş yap"
              >
                Hızlı Aç
              </button>
            </div>
          </form>
        </div>

        <div className="text-[11px] text-indigo-300/60 flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Gizlilik Kuralı: Öğrenciler ödev puanlarını göremez.</span>
        </div>
      </div>
    );
  }

  // Teacher is authenticated: Full Dashboard
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden flex flex-col">
      {/* Teacher Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/30">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Öğretmen Yönetim Masası</h3>
                <span className="text-[10px] uppercase font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  Yetkili Mod
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">Rehberlik & Psikolojik Danışmanlık Portalı</p>
            </div>
          </div>

          <button
            onClick={onTeacherLogout}
            className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            title="Öğretmen oturumunu kapat"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Ödev Sonuçları ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Kayıtlı Öğrenciler ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('links')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'links'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Modül Linkleri</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Aktiviteler ({exercises.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[550px]">
        {/* SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Önemli Kural Bilgisi: </span>
                Öğrenciler ödevi tamamladıklarını görürler ancak verdiğiniz puanları ve özel değerlendirme notlarını göremezler. Sonuçlar yalnızca burada saklanır.
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Henüz teslim edilmiş ödev bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/60 hover:bg-white transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-800">{sub.studentName}</span>
                          <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">
                            No: {sub.studentNumber}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-indigo-600 block mt-0.5">
                          {sub.moduleTitle}
                        </span>
                      </div>

                      <div className="text-right">
                        {sub.teacherScore !== undefined ? (
                          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-lg text-xs font-bold">
                            <Award className="w-3.5 h-3.5" />
                            <span>Puan: {sub.teacherScore}/100</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg">
                            Puan Bekliyor
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {new Date(sub.submittedAt).toLocaleDateString('tr-TR')} {new Date(sub.submittedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <div>
                        <span className="font-bold text-slate-700">Uygulanan Çalışma: </span>
                        <span>{sub.answers.appliedActivity}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">Öğrenci Yorumu / Deneyimi: </span>
                        <span className="italic text-slate-600">"{sub.answers.reflectionText}"</span>
                      </div>
                      <div className="flex gap-4 text-[11px] pt-1 text-slate-500 font-medium">
                        <span>Önceki Kaygı: <strong>{sub.answers.selfFeelingBefore}</strong></span>
                        <span>Sonraki Kaygı: <strong>{sub.answers.selfFeelingAfter}</strong></span>
                      </div>
                    </div>

                    {sub.teacherFeedback && (
                      <div className="text-[11px] bg-indigo-50/70 p-2 rounded-xl text-indigo-900 border border-indigo-100 flex items-start gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Öğretmen Özel Notu: </span>
                          <span>{sub.teacherFeedback}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleOpenGradeModal(sub)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{sub.teacherScore !== undefined ? 'Puanı Güncelle' : 'Puan ve Not Ver'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span>Toplam Kayıtlı Öğrenci: <strong>{students.length}</strong></span>
              <span className="text-[11px] text-indigo-600 font-medium">Veriler tarayıcı deposunda saklanır</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider rounded-xl">
                  <tr>
                    <th className="p-2.5 rounded-l-xl">No</th>
                    <th className="p-2.5">Ad Soyad</th>
                    <th className="p-2.5">Sınıf</th>
                    <th className="p-2.5">Şifre</th>
                    <th className="p-2.5">Ödev Sayısı</th>
                    <th className="p-2.5 rounded-r-xl">Kayıt Tarihi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((st) => {
                    const studentSubCount = submissions.filter(s => s.studentNumber === st.studentNumber).length;
                    return (
                      <tr key={st.id} className="hover:bg-indigo-50/50 transition-colors">
                        <td className="p-2.5 font-bold font-mono text-indigo-600">{st.studentNumber}</td>
                        <td className="p-2.5 font-semibold text-slate-800">{st.fullName}</td>
                        <td className="p-2.5 text-slate-600">{st.className || '-'}</td>
                        <td className="p-2.5 font-mono text-slate-500 font-bold">•••• ({st.password})</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                            {studentSubCount}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-400 text-[11px]">
                          {new Date(st.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LINKS TAB */}
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-xs text-indigo-900">
              <span className="font-bold">Öğretmen Modül Linkleri Yönetimi: </span>
              "Sekmelere tıkladığında açılan bağlantıları da yine seninle paylaşacağım, link atacağım sana." talebiniz doğrultusunda, her modülün bağlantısını buradan dilediğiniz zaman güncelleyebilir veya test edebilirsiniz.
            </div>

            {linkSaveStatus && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{linkSaveStatus}</span>
              </div>
            )}

            <div className="space-y-3">
              {INITIAL_MODULES.map((mod) => (
                <div key={mod.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{mod.title}</span>
                    <a
                      href={moduleLinks[mod.id] || mod.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                    >
                      <span>Linki Test Et</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={moduleLinks[mod.id] || ''}
                      onChange={(e) =>
                        setModuleLinks({
                          ...moduleLinks,
                          [mod.id]: e.target.value
                        })
                      }
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono"
                    />
                    <button
                      onClick={() => handleSaveLink(mod.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXERCISES ACTIVITY TAB */}
        {activeTab === 'exercises' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500">
              Öğrencilerin uyguladığı nefes, balon patlatma ve odak egzersizlerinin geçmiş kayıtları:
            </div>

            {exercises.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Henüz egzersiz tamamlama kaydı bulunmuyor.
              </div>
            ) : (
              <div className="space-y-2">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">{ex.exerciseTitle}</span>
                        <div className="text-[11px] text-slate-500">
                          Öğrenci No: <strong>{ex.studentNumber}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <div>Süre: {Math.round(ex.durationSeconds)} sn</div>
                      <div>{new Date(ex.completedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">Ödev Değerlendirme & Puanlama</h4>
                <p className="text-xs text-slate-300">
                  {selectedSub.studentName} ({selectedSub.studentNumber}) — {selectedSub.moduleTitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-5 space-y-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                <div>
                  <span className="font-bold text-slate-700">Öğrencinin Yorumu: </span>
                  <p className="text-slate-600 italic mt-0.5">"{selectedSub.answers.reflectionText}"</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Puan (0 - 100) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-12 text-center text-sm font-bold bg-indigo-50 text-indigo-700 py-1 rounded-lg font-mono">
                    {scoreInput}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Öğretmen Değerlendirme & Geri Bildirim Notu
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Öğrencinin farkındalığını pekiştirecek özel notunuzu yazınız..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {saveSuccessMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-300 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Puanı Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DailyQuote } from './components/DailyQuote';
import { ExercisesSection } from './components/ExercisesSection';
import { ModulesSection } from './components/ModulesSection';
import { StudentAssignmentsView } from './components/StudentAssignmentsView';
import { TeacherArea } from './components/TeacherArea';
import { StudentAuthModal } from './components/StudentAuthModal';
import {
  getCurrentSession,
  setCurrentSession,
  getStoredStudents,
  Student
} from './data/storage';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeMainSection, setActiveMainSection] = useState<'all' | 'exercises' | 'modules' | 'my-homework'>('all');
  const [dataRefreshKey, setDataRefreshKey] = useState<number>(0);

  // Initialize session
  useEffect(() => {
    const session = getCurrentSession();
    if (session && session.role === 'student' && session.student) {
      setCurrentStudent(session.student);
    } else if (session && session.role === 'teacher') {
      setIsTeacherAuthenticated(true);
    }
  }, []);

  const handleStudentLoginSuccess = (student: Student) => {
    setCurrentStudent(student);
    setCurrentSession({ role: 'student', student });
    setDataRefreshKey((k) => k + 1);
  };

  const handleStudentLogout = () => {
    setCurrentStudent(null);
    setCurrentSession(null);
    setDataRefreshKey((k) => k + 1);
  };

  const handleTeacherLogin = () => {
    setIsTeacherAuthenticated(true);
    setCurrentSession({ role: 'teacher', teacherName: 'Rehber Öğretmen' });
    setDataRefreshKey((k) => k + 1);
  };

  const handleTeacherLogout = () => {
    setIsTeacherAuthenticated(false);
    // return to default student or clean session
    const students = getStoredStudents();
    if (students.length > 0) {
      setCurrentStudent(students[0]);
      setCurrentSession({ role: 'student', student: students[0] });
    } else {
      setCurrentSession(null);
    }
    setDataRefreshKey((k) => k + 1);
  };

  const scrollToTeacherArea = () => {
    const el = document.getElementById('left-teacher-area');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation with Live Clock & Calendar */}
      <Navbar
        currentStudent={currentStudent}
        isTeacherAuthenticated={isTeacherAuthenticated}
        onOpenStudentAuth={() => setIsAuthModalOpen(true)}
        onStudentLogout={handleStudentLogout}
        onScrollToTeacher={scrollToTeacherArea}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SOL TARAFTA ÖĞRETMEN ALANI (Left Column Teacher Area) */}
          <aside
            id="left-teacher-area"
            className="lg:col-span-4 xl:col-span-4 space-y-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
                  Öğretmen & Yönetim Alanı
                </h2>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Sol Panel
              </span>
            </div>

            {/* Teacher Area Widget */}
            <TeacherArea
              key={`teacher-area-${dataRefreshKey}`}
              isTeacherAuthenticated={isTeacherAuthenticated}
              onTeacherLogin={handleTeacherLogin}
              onTeacherLogout={handleTeacherLogout}
              onRefreshData={() => setDataRefreshKey((k) => k + 1)}
            />

            {/* Student Profile Quick Card in Sidebar */}
            {currentStudent ? (
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{currentStudent.fullName}</h4>
                    <p className="text-xs text-slate-500 font-mono">
                      No: {currentStudent.studentNumber} {currentStudent.className ? `• ${currentStudent.className}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span>Hesap Durumu:</span>
                  <span className="font-bold text-emerald-600">Aktif Öğrenci</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/60 text-center space-y-3">
                <p className="text-xs text-slate-600">
                  Egzersiz ve modül ödevlerinizi kaydetmek için öğrenci girişi yapabilirsiniz.
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Öğrenci No ile Giriş Yap
                </button>
              </div>
            )}
          </aside>

          {/* ORTA VE SAĞ ALAN: MOTİVASYON, EGZERSİZLER & 6 MODÜL */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-8">
            {/* HER SAYFA YENİLENDİĞİNDE SINAV KAYGISIYLA ALAKALI GÜZEL SÖZLER */}
            <DailyQuote />

            {/* Quick Navigation Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveMainSection('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeMainSection === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                Tüm Bölümler
              </button>
              <button
                onClick={() => setActiveMainSection('exercises')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeMainSection === 'exercises'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Oyunlar & Egzersizler</span>
              </button>
              <button
                onClick={() => setActiveMainSection('modules')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeMainSection === 'modules'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>6 Eğitsel Modül</span>
              </button>
              <button
                onClick={() => setActiveMainSection('my-homework')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeMainSection === 'my-homework'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Uyguladığım Ödevler</span>
              </button>
            </div>

            {/* 1. ORTADA RENKLENDİRİLMİŞ ESTETİK EGZERSİZ & OYUN ALANI */}
            {(activeMainSection === 'all' || activeMainSection === 'exercises') && (
              <ExercisesSection
                currentStudent={currentStudent}
                onRefreshData={() => setDataRefreshKey((k) => k + 1)}
              />
            )}

            {/* 2. 6 MODÜL SEKMELERİ VE ÖDEV FORMU */}
            {(activeMainSection === 'all' || activeMainSection === 'modules') && (
              <ModulesSection
                currentStudent={currentStudent}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                onHomeworkSubmitted={() => setDataRefreshKey((k) => k + 1)}
              />
            )}

            {/* 3. ÖĞRENCİ ÖDEVLERİ (Depolama & Sonuç Gizliliği Alanı) */}
            {(activeMainSection === 'all' || activeMainSection === 'my-homework') && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                      Uyguladığım Ödevler ve Aktiviteler
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sisteme kaydettiğin tüm çalışmaların listesi
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                    Depolama Alanı
                  </span>
                </div>

                <StudentAssignmentsView
                  currentStudent={currentStudent}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white border-t border-slate-200 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 Sınav Kaygısı ve Öğrenci Destek Platformu. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-1.5 text-slate-500">
            <span>✨</span> "Sakin bir zihin, en büyük gücündür."
          </p>
        </div>
      </footer>

      {/* Student Auth Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleStudentLoginSuccess}
      />
    </div>
  );
}

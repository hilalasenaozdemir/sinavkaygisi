import React, { useState } from 'react';
import { authenticateStudent, saveStudent, getStoredStudents, Student } from '../data/storage';
import { User, Lock, UserPlus, LogIn, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: Student) => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('12-A');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!studentNumber.trim() || !password.trim()) {
      setErrorMsg('Lütfen öğrenci numarası ve şifrenizi giriniz.');
      return;
    }

    const res = authenticateStudent(studentNumber, password);
    if (res.success && res.student) {
      setSuccessMsg('Giriş başarılı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        onLoginSuccess(res.student!);
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!studentNumber.trim() || !password.trim() || !fullName.trim()) {
      setErrorMsg('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    const res = saveStudent({
      studentNumber: studentNumber.trim(),
      password: password.trim(),
      fullName: fullName.trim(),
      className: className.trim()
    });

    if (res.success && res.student) {
      setSuccessMsg('Kaydınız başarıyla oluşturuldu! Oturum açılıyor...');
      setTimeout(() => {
        onLoginSuccess(res.student!);
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.message);
    }
  };

  const selectDemoAccount = (s: Student) => {
    setStudentNumber(s.studentNumber);
    setPassword(s.password);
  };

  const demoList = getStoredStudents().slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header with vibrant aesthetic gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-black/10 hover:bg-black/20"
          >
            ✕
          </button>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold">
            {isRegisterMode ? 'Öğrenci Kayıt Formu' : 'Öğrenci Giriş Portalı'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            {isRegisterMode
              ? 'Numaranı ve şifreni belirleyerek egzersizlere ve modüllere başla.'
              : 'Öğrenci numaran ve şifren ile platforma bağlan.'}
          </p>
        </div>

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Örn: Zeynep Kaya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Öğrenci Numarası (Okul No) *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Örn: 101"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sınıf / Şube
                </label>
                <input
                  type="text"
                  placeholder="Örn: 12-A ya da Mezun"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Şifre *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              id="submit-auth-btn"
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-300 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isRegisterMode ? (
                <>
                  <UserPlus className="w-4 h-4" /> Kaydı Tamamla
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Giriş Yap
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Student Selector */}
          {!isRegisterMode && demoList.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Hızlı Test İçin Örnek Öğrenci Seç:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {demoList.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => selectDemoAccount(demo)}
                    className="p-2 rounded-xl text-left bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 transition-all text-xs"
                  >
                    <span className="font-bold text-slate-800 block truncate">{demo.fullName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">No: {demo.studentNumber}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isRegisterMode
                ? 'Zaten bir hesabın var mı? Giriş Yap'
                : 'Hesabın yok mu? Yeni Öğrenci Kaydı Aç'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

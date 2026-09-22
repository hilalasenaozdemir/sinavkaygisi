import React from 'react';
import { Student } from '../types';
import { DateTimeWidget } from './DateTimeWidget';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  HeartHandshake
} from 'lucide-react';

interface NavbarProps {
  currentStudent: Student | null;
  isTeacherAuthenticated: boolean;
  onOpenStudentAuth: () => void;
  onStudentLogout: () => void;
  onScrollToTeacher: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStudent,
  isTeacherAuthenticated,
  onOpenStudentAuth,
  onStudentLogout,
  onScrollToTeacher
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-300">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                Zihin & Başarı
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                Sınav Kaygısı Destek
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5">
              Öğrenci ve Öğretmen Eğitsel Rahatlama & Gelişim Alanı
            </p>
          </div>
        </div>

        {/* Right Section: Time Widget + User Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Real-time Clock and Calendar Widget on Top Right */}
          <DateTimeWidget />

          {/* Teacher Status or Quick Jump Button */}
          <button
            onClick={onScrollToTeacher}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
              isTeacherAuthenticated
                ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Sol taraftaki öğretmen alanına git"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{isTeacherAuthenticated ? 'Öğretmen Masası' : 'Öğretmen Girişi'}</span>
          </button>

          {/* Student Account Status / Login */}
          {currentStudent ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div
                onClick={onOpenStudentAuth}
                className="flex items-center gap-2 p-1.5 pr-3 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/70 rounded-2xl cursor-pointer transition-all"
                title="Hesap değiştir"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentStudent.fullName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentStudent.fullName}
                  </div>
                  <div className="text-[10px] text-indigo-600 font-mono font-semibold">
                    No: {currentStudent.studentNumber} {currentStudent.className ? `(${currentStudent.className})` : ''}
                  </div>
                </div>
              </div>

              <button
                onClick={onStudentLogout}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-all cursor-pointer"
                title="Öğrenci oturumunu kapat"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenStudentAuth}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Öğrenci Girişi</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

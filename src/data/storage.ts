import { Student, HomeworkSubmission, ExerciseSession, EducationalModule } from '../types';
export type { Student, HomeworkSubmission, ExerciseSession, EducationalModule };
import { INITIAL_MODULES } from './modules';

const STORAGE_KEYS = {
  STUDENTS: 'sinav_platform_students_v1',
  CURRENT_USER: 'sinav_platform_current_user_v1',
  SUBMISSIONS: 'sinav_platform_submissions_v1',
  EXERCISES: 'sinav_platform_exercises_v1',
  CUSTOM_MODULE_LINKS: 'sinav_platform_module_links_v1',
  TEACHER_KEY: 'sinav_platform_teacher_password_v1'
};

// Seed sample students if none exist
const DEFAULT_STUDENTS: Student[] = [
  {
    id: 's-101',
    studentNumber: '101',
    password: '1234',
    fullName: 'Zeynep Kaya',
    className: '12-A',
    createdAt: '2026-09-15T09:00:00.000Z'
  },
  {
    id: 's-102',
    studentNumber: '102',
    password: '1234',
    fullName: 'Ahmet Demir',
    className: '12-B',
    createdAt: '2026-09-16T11:20:00.000Z'
  },
  {
    id: 's-103',
    studentNumber: '103',
    password: '1234',
    fullName: 'Elif Şahin',
    className: '12-C',
    createdAt: '2026-09-18T14:15:00.000Z'
  }
];

const DEFAULT_SUBMISSIONS: HomeworkSubmission[] = [
  {
    id: 'sub-1',
    studentNumber: '101',
    studentName: 'Zeynep Kaya',
    moduleId: 1,
    moduleTitle: '1. Modül: Sınav Kaygısını Tanıma & Anlama',
    answers: {
      appliedActivity: 'Sınav öncesi nabız ve omuz kasılmalarımı gözlemledim.',
      reflectionText: 'Deneme sınavından önce ellerim terliyordu ve kalbim çok hızlı atıyordu. Bu modüldeki kutu nefesi tekniğini uyguladım ve yaklaşık 3 dakika içinde nabzım sakinleşti.',
      selfFeelingBefore: '8 (Yüksek Kaygı)',
      selfFeelingAfter: '4 (Kontrol Edilebilir Düzey)'
    },
    submittedAt: '2026-09-19T10:30:00.000Z',
    status: 'reviewed',
    teacherScore: 95,
    teacherFeedback: 'Harika bir farkındalık Zeynep! Kutu nefesini denemelerde her bölüm geçişinde 30 saniye tekrarlaman çok faydalı olacaktır.',
    teacherReviewDate: '2026-09-19T16:00:00.000Z'
  },
  {
    id: 'sub-2',
    studentNumber: '102',
    studentName: 'Ahmet Demir',
    moduleId: 2,
    moduleTitle: '2. Modül: Olumsuz Düşünceleri Yönetme',
    answers: {
      appliedActivity: 'Otomatik düşünce dönüştürme tablosunu uyguladım.',
      reflectionText: "'Matematikte yapamazsam tüm geleceğim kararır' düşüncesini fark ettim. Yerine 'Bir deneme sınavı geleceğimi tek başına belirleyemez, sadece eksiklerimi gösterir' cümlesini koydum.",
      selfFeelingBefore: '9 (Yoğun Baskı)',
      selfFeelingAfter: '5 (Rahatlamış)'
    },
    submittedAt: '2026-09-20T14:45:00.000Z',
    status: 'submitted',
    teacherScore: 88,
    teacherFeedback: 'Bilişsel esneklik örneğin çok yerinde Ahmet. Harika ilerliyorsun.',
    teacherReviewDate: '2026-09-21T09:10:00.000Z'
  }
];

export function getStoredStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STUDENTS;
  }
}

export function saveStudent(student: Omit<Student, 'id' | 'createdAt'>): { success: boolean; message: string; student?: Student } {
  const students = getStoredStudents();
  if (students.some(s => s.studentNumber === student.studentNumber)) {
    return { success: false, message: 'Bu öğrenci numarası ile kayıtlı bir hesap zaten var!' };
  }

  const newStudent: Student = {
    ...student,
    id: 's-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  const updated = [...students, newStudent];
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
  return { success: true, message: 'Öğrenci kaydı başarıyla oluşturuldu!', student: newStudent };
}

export function authenticateStudent(studentNumber: string, password: string): { success: boolean; student?: Student; message: string } {
  const students = getStoredStudents();
  const found = students.find(s => s.studentNumber === studentNumber.trim());
  if (!found) {
    return { success: false, message: 'Öğrenci numarası bulunamadı. Lütfen kayıt olunuz.' };
  }
  if (found.password !== password) {
    return { success: false, message: 'Hatalı şifre! Lütfen tekrar deneyiniz.' };
  }
  return { success: true, student: found, message: 'Giriş başarılı.' };
}

export interface CurrentUserSession {
  role: 'student' | 'teacher';
  student?: Student;
  teacherName?: string;
}

export function getCurrentSession(): CurrentUserSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) {
      // Default to demo student 101 for immediate out-of-the-box rich preview
      const defaultUser: CurrentUserSession = {
        role: 'student',
        student: DEFAULT_STUDENTS[0]
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentSession(session: CurrentUserSession | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } else {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
  }
}

// Submissions
export function getStoredSubmissions(): HomeworkSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(DEFAULT_SUBMISSIONS));
      return DEFAULT_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SUBMISSIONS;
  }
}

export function submitHomework(submission: Omit<HomeworkSubmission, 'id' | 'submittedAt' | 'status'>): HomeworkSubmission {
  const all = getStoredSubmissions();
  const newSub: HomeworkSubmission = {
    ...submission,
    id: 'sub-' + Date.now(),
    submittedAt: new Date().toISOString(),
    status: 'submitted'
  };

  const updated = [newSub, ...all];
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
  return newSub;
}

export function gradeSubmission(submissionId: string, score: number, feedback: string): boolean {
  const all = getStoredSubmissions();
  const idx = all.findIndex(s => s.id === submissionId);
  if (idx === -1) return false;

  all[idx].teacherScore = score;
  all[idx].teacherFeedback = feedback;
  all[idx].status = 'reviewed';
  all[idx].teacherReviewDate = new Date().toISOString();

  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(all));
  return true;
}

// Exercises activity logs
export function getStoredExercises(): ExerciseSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXERCISES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function logExerciseCompletion(exercise: Omit<ExerciseSession, 'id' | 'completedAt'>): void {
  const all = getStoredExercises();
  const newLog: ExerciseSession = {
    ...exercise,
    id: 'ex-' + Date.now(),
    completedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify([newLog, ...all]));
}

// Module links (Teacher can customize external URLs for the 6 modules)
export function getModuleLinks(): Record<number, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_MODULE_LINKS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  const defaults: Record<number, string> = {};
  INITIAL_MODULES.forEach(m => {
    defaults[m.id] = m.externalUrl || 'https://www.meb.gov.tr';
  });
  return defaults;
}

export function saveModuleLink(moduleId: number, url: string): void {
  const current = getModuleLinks();
  current[moduleId] = url;
  localStorage.setItem(STORAGE_KEYS.CUSTOM_MODULE_LINKS, JSON.stringify(current));
}

// Teacher password validation
export function verifyTeacherPassword(password: string): boolean {
  const saved = localStorage.getItem(STORAGE_KEYS.TEACHER_KEY) || 'ogretmen123';
  return password.trim() === saved;
}

export function updateTeacherPassword(newPass: string): void {
  localStorage.setItem(STORAGE_KEYS.TEACHER_KEY, newPass);
}

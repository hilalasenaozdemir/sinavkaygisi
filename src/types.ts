export interface Student {
  id: string;
  studentNumber: string;
  password: string;
  fullName: string;
  className?: string;
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  studentNumber: string;
  studentName: string;
  moduleId: number;
  moduleTitle: string;
  answers: {
    appliedActivity: string;
    reflectionText: string;
    selfFeelingBefore: string;
    selfFeelingAfter: string;
  };
  submittedAt: string;
  status: 'submitted' | 'reviewed';
  // IMPORTANT: The following fields are ONLY visible to the teacher, never revealed to the student!
  teacherScore?: number;
  teacherFeedback?: string;
  teacherReviewDate?: string;
}

export interface ExerciseSession {
  id: string;
  studentNumber: string;
  exerciseType: string;
  exerciseTitle: string;
  completedAt: string;
  durationSeconds: number;
  score?: number;
}

export interface EducationalModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  externalUrl?: string; // Link provided or customized by teacher
  homeworkPrompt: string;
  reflectionPrompt: string;
  color: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    light: string;
    badge: string;
  };
}

export interface MotivationalQuote {
  id: number;
  quote: string;
  author: string;
  category: 'sınav_kaygısı' | 'özgüven' | 'odaklanma' | 'başarı' | 'sakinlik';
  stressTip: string;
}

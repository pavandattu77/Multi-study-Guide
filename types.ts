export interface StudyPlanDay {
  day: number;
  topic: string;
  activities: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export enum FeatureType {
  EXAM_MODE = 'exam-mode',
  SCAN_BOARD = 'scan-board',
  PAPER_GEN = 'paper-generator',
  TUTOR = 'tutor',
  FLASHCARDS = 'flashcards',
  NOTES_GEN = 'notes-gen'
}

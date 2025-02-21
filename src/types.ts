export interface User {
  id: string;
  email: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  continent: string;
  score: number;
  time_taken: number;
  created_at: string;
}

export interface Question {
  id: number;
  continent: string;
  question: string;
  options: string[];
  correct_answer: string;
}
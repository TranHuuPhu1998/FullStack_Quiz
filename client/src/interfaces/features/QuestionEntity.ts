export interface QuestionItem {
  name: string;
  categoryId: string;
  courseId: string;
  answers: AnswerItem[];
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
}

export interface AnswerItem {
  id: string | number;
  content: string;
  isCorrect: boolean;
}

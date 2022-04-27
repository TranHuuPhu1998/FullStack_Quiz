export interface QuestionItem {
  name: string;
  categoryId: string;
  courseId: string;
  answers: AnswerItem[];
  id?: string;
}

export interface AnswerItem {
  id: string | number;
  content: string;
  isCorrect: boolean;
}

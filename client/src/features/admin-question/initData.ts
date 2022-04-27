import { QuestionItem } from 'interfaces/features/QuestionEntity';
import { nanoid } from 'nanoid';

export const initialValues: QuestionItem = {
  name: ``,
  categoryId: '',
  answers: [
    {
      id: nanoid(),
      content: '',
      isCorrect: false,
    },
  ],
  courseId: '',
};

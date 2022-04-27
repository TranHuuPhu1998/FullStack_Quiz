import * as Yup from 'yup';
import { TFunction } from 'react-i18next';

export const AddQuestionSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Required')),
    categoryId: Yup.string().required(t('Required')),
    courseId: Yup.string().required(t('Required')),
    answers: Yup.array().required(t('Required')).min(1, t('Too Short!')).max(6, t('Too Long!')),
  });
};

export const UpdateQuestionSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Required')),
    categoryId: Yup.string().required(t('Required')),
    courseId: Yup.string().required(t('Required')),
    answers: Yup.array().required(t('Required')).min(1, t('Too Short!')).max(6, t('Too Long!')),
  });
};

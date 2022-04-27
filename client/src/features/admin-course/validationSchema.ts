import * as Yup from 'yup';
import { TFunction } from 'react-i18next';

export const AddCourseSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('Required!')),
    categoryId: Yup.string().required(t('Required!')),
    description: Yup.string()
      .required(t('Required!'))
      .min(2, t('Too Short!'))
      .max(200, t('Too Long!')),
    released: Yup.boolean().required(t('Required')),
  });
};

export const EditCourseSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('Required!')),
    categoryId: Yup.string().required(t('Required!')),
    descriptions: Yup.string()
      .required(t('Required!'))
      .min(2, t('Too Short!'))
      .max(200, t('Too Long!')),
    released: Yup.boolean().required(t('Required')),
  });
};

import * as Yup from 'yup';
import { TFunction } from 'react-i18next';

export const AddCategorySchema = (t:TFunction) =>Yup.object().shape({
  name: Yup.string()
    .min(2, t('Too Short!'))
    .max(50, t('Too Long!'))
    .required(),
});

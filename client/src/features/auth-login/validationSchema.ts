import * as Yup from 'yup';
import { TFunction } from 'react-i18next';

export const LoginSchema = (t: TFunction) => {
  return Yup.object().shape({
    account: Yup.string().required(t('Required')),
    password: Yup
    .string()
    .required(t('Required'))
    .min(6),
  });
}
import * as Yup from 'yup';
import { TFunction } from 'react-i18next';

export const RegisterSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Required')),
    account: Yup.string().required(t('Required')),
    password: Yup
    .string()
    .required(t('Required'))
    .min(6),
    retype_password: Yup
    .string()
    .required(t('Required'))
    .oneOf([Yup.ref('password')], t('Your passwords do not match.'))
  });
}
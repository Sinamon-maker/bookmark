import * as Yup from 'yup';

export const newPasswordSchema = Yup.object().shape({
  link: Yup.string().trim().required(),
  password: Yup.string()
    .trim()
    .required()
    .min(8, 'Password schould be more then 8 characters')
    .max(20, 'Password schould be less then 20 characters'),
  passwordConfirm: Yup.string()
    .oneOf(['password', 'Passwords not equal'])
    .required(),
});

export type NewPasswordValues = {
  link?: string;
  password: string;
  passwordConfirm: string;
};

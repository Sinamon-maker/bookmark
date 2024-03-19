import * as Yup from 'yup';

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('email is required field')
    .matches(emailRegexp, 'Email should be valid email'),
});
export type ResetValues = {
  email: string;
};

import * as Yup from 'yup';

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const userSignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .trim()
    .test(
      'displayName',
      'Name should be between 4 and 60 characters',
      function (val) {
        if ((val && val?.length > 4 && val?.length < 60) || val?.length === 0) {
          return true;
        }
        return false;
      },
    ),
  email: Yup.string()
    .trim()
    .required('email is required field')
    .matches(emailRegexp, 'Email should be valid email'),
  password: Yup.string()
    .trim()
    .required()
    .min(8, 'Password schould be more then 8 characters')
    .max(20, 'Password schould be less then 20 characters'),
});

export type UserSignup = {
  displayName?: string;
  password: string;
  email: string;
};

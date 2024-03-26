import React from 'react';

import {FormikValues} from 'formik';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import {resetPasswordSchema} from '../../form/schemas/resetPasswordSchems';
import useResetPassword from '../../api/useResetPassword';
import {IconsNames} from '../../config/constants';
import {newPasswordSchema} from '../../form/schemas/newPasswordSchema';

export const FormResetPassword = () => {
  const {
    errEmail,
    errPassword,
    passwordReset,
    confirmPasswordReset,
    loading,
    isEmailSend,
  } = useResetPassword();

  const submitEmail = (values: FormikValues) => {
    passwordReset(values.email);
  };
  const submitNewPassword = (values: FormikValues) => {
    confirmPasswordReset(values.code, values.password);
  };
  return (
    <>
      {!isEmailSend ? (
        <AppForm
          initialValues={{
            email: '',
          }}
          onSubmit={values => submitEmail(values)}
          validationSchema={resetPasswordSchema}
          validateOnMount={false}>
          <InputFieldForm
            placeholder="Email*"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
          />

          <ErrorComponent message={errEmail} />
          <SubmitFieldForm title="Reset password" loading={loading} />
        </AppForm>
      ) : (
        <AppForm
          initialValues={{
            link: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={values => submitNewPassword(values)}
          validationSchema={newPasswordSchema}
          validateOnMount={false}>
          <InputFieldForm
            name="link"
            placeholder="Enter link*"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            textContentType="name"
          />
          <InputFieldForm
            iconName={IconsNames.LOCK}
            placeholder="Password*"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            textContentType="password"
            name="password"
          />
          <InputFieldForm
            iconName={IconsNames.LOCK}
            placeholder="Confirm password*"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            textContentType="password"
            name="passwordConfirm"
          />
          <ErrorComponent message={errPassword} />
          <SubmitFieldForm title="Submit new password" loading={loading} />
        </AppForm>
      )}
    </>
  );
};

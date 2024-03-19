import React from 'react';

import {FormikValues} from 'formik';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import {resetPasswordSchema} from '../../form/schemas/resetPasswordSchems';

export const FormResetPassword = () => {
  // const {err, login, loading} = useLogin();

  const submit = (values: FormikValues) => {
    // login(values.email, values.password);
    console.log(values);
  };
  return (
    <AppForm
      initialValues={{
        email: '',
      }}
      onSubmit={values => submit(values)}
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

      <ErrorComponent message="jhgjgkg" />
      <SubmitFieldForm title="Reset password" />
    </AppForm>
  );
};

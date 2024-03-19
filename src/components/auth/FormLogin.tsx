import React from 'react';

import {FormikValues} from 'formik';
import {IconsNames} from '../../config/constants';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {userLoginSchema} from '../../form/schemas/loginSchema';
import {ErrorComponent} from '../../modules/common/ErrorComponent';

export const FormLogin = () => {
  // const {err, login, loading} = useLogin();

  const submit = (values: FormikValues) => {
    // login(values.email, values.password);
    console.log(values);
  };
  return (
    <AppForm
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => submit(values)}
      validationSchema={userLoginSchema}
      validateOnMount={false}>
      <InputFieldForm
        placeholder="Email*"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        name="email"
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
      <ErrorComponent message="jhgjgkg" />
      <SubmitFieldForm title="Login" />
    </AppForm>
  );
};

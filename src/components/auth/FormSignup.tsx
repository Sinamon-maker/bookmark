import React from 'react';
import {FormikValues} from 'formik';
import {IconsNames} from '../../config/constants';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {userSignupSchema} from '../../form/schemas/signipSchems';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import useSignup from '../../api/useSignup';

export const FormSignup = () => {
  const {err, signup, loading} = useSignup();

  const submit = (values: FormikValues) => {
    console.log('1', values, err, loading);
    signup(values.displayName, values.email, values.password);
    console.log('2', values, err, loading);
  };
  return (
    <AppForm
      initialValues={{
        displayName: '',
        email: '',
        password: '',
      }}
      onSubmit={values => submit(values)}
      validationSchema={userSignupSchema}
      validateOnMount={false}>
      <InputFieldForm
        iconName={IconsNames.ACCOUNT}
        name="displayName"
        placeholder="DisplayName*"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        textContentType="name"
      />
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
      <ErrorComponent message={err} />
      <SubmitFieldForm title="Signup" loading={loading} />
    </AppForm>
  );
};

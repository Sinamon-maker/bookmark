import React from 'react';

import {FormikValues} from 'formik';
import {IconsNames} from '../../config/constants';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {userLoginSchema} from '../../form/schemas/loginSchema';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import {
  NewPasswordValues,
  newPasswordSchema,
} from '../../form/schemas/newPasswordSchema';

export const FormNewPassword = () => {
  // const {err, login, loading} = useLogin();

  const submit = (values: NewPasswordValues) => {
    // login(values.email, values.password);
    console.log(values);
  };
  return (
    <AppForm
      initialValues={{
        link: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={values => submit(values)}
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
      <ErrorComponent message="jhgjgkg" />
      <SubmitFieldForm title="Submit new password" />
    </AppForm>
  );
};

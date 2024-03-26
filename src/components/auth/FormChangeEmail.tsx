import React from 'react';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import useChangeEmail from '../../api/useChangeEmail';
import {
  changeEmailSchema,
  ChangeEmailValues,
} from '../../form/schemas/changeEmailSchema';
import {IconsNames} from '../../config/constants';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenNavigationProp} from '../../navigation/stack/SettingsStackNavigator';

export const FormChangeEmail = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const successCallback = () => {
    Alert.alert('Success!', 'Your email successfully changed', [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Settings'),
      },
    ]);
  };
  const {err, changeEmail, loading} = useChangeEmail(successCallback);
  const submitEmail = (val: ChangeEmailValues) => {
    changeEmail(val.email, val.password, val.newEmail);
  };
  return (
    <AppForm<ChangeEmailValues>
      initialValues={{
        email: '',
        password: '',
        newEmail: '',
      }}
      onSubmit={values => submitEmail(values)}
      validationSchema={changeEmailSchema}
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
      <InputFieldForm
        placeholder="New email*"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        name="newEmail"
      />

      <ErrorComponent message={err} />
      <SubmitFieldForm title="Change email" loading={loading} />
    </AppForm>
  );
};

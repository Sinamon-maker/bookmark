import React from 'react';
import {useFormikContext} from 'formik';

import {StyleSheet} from 'react-native';
import {Loader} from '../modules/ui/Loader';
import {AppButton} from '../modules/ui/AppButton';

type SubmitFieldFormProps = {
  title: string;
  loading?: boolean;
};

export const SubmitFieldForm = <T,>({title, loading}: SubmitFieldFormProps) => {
  const {handleSubmit} = useFormikContext<T>();

  return (
    <AppButton
      text={loading ? '' : title}
      onPress={handleSubmit}
      btnStyles={{width: '100%'}}>
      {loading && <Loader />}
    </AppButton>
  );
};

const styles = StyleSheet.create({});

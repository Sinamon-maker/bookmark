import React from 'react';
import {useFormikContext} from 'formik';

import {FormFieldWrapper} from '../ui/FormFieldWrapper/FormFieldWrapper';
import {BaseInput, BaseInputProps} from '../modules/ui/BaseInput';
import {ErrorComponent} from '../modules/common/ErrorComponent';
import {StyleSheet, View} from 'react-native';

type InputFieldFormProps<T> = BaseInputProps & {
  name: keyof T & string;
};

export const InputFieldForm = <T extends {[key: string]: string}>(
  props: InputFieldFormProps<T>,
) => {
  const {name, ...rest} = props;
  const {setFieldValue, setFieldTouched, touched, errors, values} =
    useFormikContext<T>();

  const handleChange = (val: string) => {
    setFieldValue(name, val);
  };
  return (
    <View style={styles.fieldWrap}>
      <BaseInput
        {...rest}
        error={errors[name] && touched[name] ? !!errors[name] : false}
        onBlur={() => setFieldTouched(name)}
        onChangeText={val => handleChange(val)}
        value={values[name]}
      />

      {errors[name] && touched[name] && (
        <ErrorComponent message={errors[name] as string} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldWrap: {
    marginBottom: 12,
  },
});

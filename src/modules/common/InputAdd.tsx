import React, {useState} from 'react';
import {IconsNames} from '../../config/constants';
import {AppButton} from '../ui/AppButton';
import {BaseInput} from '../ui/BaseInput';
import {IconComponent} from '../ui/IconComponent';
import {StyleSheet} from 'react-native';

export type InputAddProps = {
  placeholder?: string;
  submit: (val: string) => void;
};

export const InputAdd = ({submit, placeholder = ''}: InputAddProps) => {
  const [string, setString] = useState('');

  const clearInput = () => {
    setString('');
  };

  const onSubmit = () => {
    submit(string);
    clearInput();
  };
  return (
    <BaseInput
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="default"
      textContentType="none"
      variant="secondary"
      value={string}
      onChangeText={text => setString(text)}>
      {string.length !== 0 && (
        <AppButton btnStyles={styles.closeBtn} onPress={clearInput}>
          <IconComponent iconName={IconsNames.CLOSE} size={18} />
        </AppButton>
      )}
      <AppButton
        btnStyles={styles.btnAdd}
        disabled={string.length < 2}
        onPress={onSubmit}>
        <IconComponent iconName={IconsNames.ADD} size={20} />
      </AppButton>
    </BaseInput>
  );
};
const styles = StyleSheet.create({
  btnAdd: {
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  closeBtn: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
});

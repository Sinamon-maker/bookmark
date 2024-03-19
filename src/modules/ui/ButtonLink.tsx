import React from 'react';

import {AppButton} from './AppButton';
import {StyleSheet} from 'react-native';

export type ButtonLinkProps = {
  text: string;
  disabled?: boolean;
  onPress: () => void;
  color?: string;
};

export const ButtonLink = ({
  onPress,
  disabled = false,
  text,
  color,
}: ButtonLinkProps) => {
  return (
    <AppButton
      text={text}
      disabled={disabled}
      btnStyles={styles.btnStyles}
      textStyles={styles.textStyles}
      onPress={onPress}
      textColor={color}
    />
  );
};

const styles = StyleSheet.create({
  btnStyles: {
    padding: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    textDecorationLine: 'underline',
  },
});

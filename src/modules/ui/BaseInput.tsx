import React, {ReactNode, forwardRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {IconComponent} from './IconComponent';
import {IconsNames} from '../../config/constants';

export type BaseInputProps = TextInputProps & {
  error?: boolean;
  children?: ReactNode;
  iconName?: IconsNames;
  type?: 'small' | 'large';
  width?: number;
  variant?: 'secondary' | 'primary';
};

export const BaseInput = forwardRef<TextInput, BaseInputProps>((props, ref) => {
  const {
    error = false,
    children,
    iconName,
    width,
    type = 'large',
    variant = 'primary',
    ...others
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const border = isFocused
    ? colors.secondary
    : error
    ? colors.danger
    : colors.textMain;
  const getSize = () => {
    if (type !== 'small') {
      return {...size.lg};
    } else {
      return {...size.sm};
    }
  };

  const appearance = variant === 'primary' ? styles.primary : styles.secondary;
  const textInput =
    variant === 'primary' ? styles.inputPrimary : styles.inputSecondary;
  return (
    <View
      style={[
        styles.inputWrap,
        {
          width: width ? `${width}%` : '100%',
          borderColor: border,
          paddingVertical: type === 'small' ? 4 : 8,
        },
        appearance,
      ]}>
      {iconName && (
        <IconComponent iconName={iconName} color={colors.secondary} />
      )}

      <TextInput
        ref={ref}
        style={[styles.input, {...getSize()}, textInput]}
        placeholderTextColor={colors.textPlaceholder}
        onEndEditing={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        {...others}
      />
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  inputWrap: {
    borderWidth: 2,

    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  primary: {
    backgroundColor: colors.light,
  },
  secondary: {
    backgroundColor: colors.mainBack,
  },
  input: {
    // paddingTop: 0,
    //paddingBottom: 0,
    flex: 1,
    paddingVertical: 0,
    //  padding: 10,
    ...size.lg,
    textAlignVertical: 'center',
    alignContent: 'flex-start',
    verticalAlign: 'middle',

    fontFamily: font.InterRegular,
  },
  inputPrimary: {
    color: colors.textDark,
  },
  inputSecondary: {
    color: colors.textMain,
  },
});

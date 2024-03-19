import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';

export type AppButtonProps = {
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  background?: string;
  textColor?: string;
  onPress?: () => void;
  textStyles?: TextStyle;
  btnStyles?: ViewStyle;
  onLongpress?: () => void;
};

export const AppButton = ({
  children,
  onPress,
  disabled = false,
  text,
  background = colors.primary,
  textColor = colors.textMain,
  onLongpress,
  textStyles,
  btnStyles,
}: AppButtonProps) => {
  const pressButton = () => {
    if (!disabled) {
      onPress && onPress();
    }
  };

  const onPressButtomLong = () => {
    if (!disabled) {
      onLongpress && onLongpress();
    }
  };
  return (
    <Pressable
      style={({pressed}) => [pressed && {opacity: 0.8}]}
      onPress={pressButton}
      onLongPress={onPressButtomLong}>
      <View
        style={[
          styles.wrapBtn,
          {opacity: disabled ? 0.4 : 1, backgroundColor: background},
          btnStyles,
        ]}>
        {children}
        {text && (
          <Text style={[styles.text, {color: textColor}, textStyles]}>
            {text}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  text: {
    fontFamily: font.InterRegular,
    ...size.lg,
  },
});

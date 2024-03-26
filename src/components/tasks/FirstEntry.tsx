import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, size} from '../../config/fonts';
import {colors} from '../../config/colors';
import {AppButton} from '../../modules/ui/AppButton';

export type FirstEntryProps = {
  text: string;
  onPressStart?: () => void;
};

export const FirstEntry = ({text, onPressStart}: FirstEntryProps) => {
  const onPress = () => {
    onPressStart && onPressStart();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <AppButton text="start" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    gap: 16,
    paddingTop: 40,
  },
  text: {
    fontFamily: font.InterSemiBold,
    ...size.lg,
    color: colors.textMain,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
});

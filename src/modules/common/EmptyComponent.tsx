import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, size} from '../../config/fonts';
import {colors} from '../../config/colors';

export type EmptyComponentProps = {
  title: string;
};

export const EmptyComponent = ({title}: EmptyComponentProps) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}> {title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontFamily: font.InterSemiBold,
    ...size.lg,
    color: colors.textMain,
  },
});

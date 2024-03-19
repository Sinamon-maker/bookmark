import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../config/colors';
import {size} from '../../config/fonts';

type Props = {
  message: string;
};

export const ErrorComponent = ({message}: Props) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 4,
    paddingLeft: 8,
  },
  text: {
    ...size.sm,
    color: colors.danger,
  },
});

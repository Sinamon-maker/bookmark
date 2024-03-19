import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../../config/colors';

type Props = {
  children: React.ReactNode;
};

export const ScreenWrapper = ({children}: Props) => {
  return (
    <SafeAreaView style={styles.safeWrap}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeWrap: {
    backgroundColor: colors.primary,
    height: 'auto',
  },
});

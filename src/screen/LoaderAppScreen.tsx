import React from 'react';
import {ScreenWrapper} from '../modules/common/ScreenWrapper';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {colors} from '../config/colors';

export const LoaderAppScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.additional} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

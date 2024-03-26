import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenWrapper} from '../modules/common/ScreenWrapper';
import {colors} from '../config/colors';
import {Skeleton} from '../modules/ui/Skeleton';

export const LoaderScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <View style={styles.filter}>
          <Skeleton width={'70'} height={35} />
          <Skeleton width={35} height={35} />
        </View>
        <View style={styles.filter}>
          <Skeleton width={'70'} height={35} />
          <Skeleton width={35} height={35} />
        </View>
        <Skeleton width={'100'} height={100} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainBack,
    padding: 12,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  main: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    borderRadius: 10,
    opacity: 0.6,
  },
});

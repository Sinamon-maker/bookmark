import React, {useCallback, useEffect, useMemo} from 'react';
import {Animated, DimensionValue, Easing, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';

export type LoaderProps = {
  size?: DimensionValue;
  color?: string;
};

export const Loader = ({size, color}: LoaderProps) => {
  const spinValue = useMemo(() => new Animated.Value(0), []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spin = useCallback(() => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 360,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  }, [spinValue]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);
  return (
    <Animated.View
      style={[
        styles.loader,
        {
          borderColor: color ? color : colors.secondary,
          width: size ? size : 40,
          height: size ? size : 40,
          transform: [{rotate}, {perspective: 1000}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    borderWidth: 4,
    borderRadius: 50,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

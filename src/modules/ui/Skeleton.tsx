import React, {useEffect, useRef} from 'react';
import {
  DimensionValue,
  StyleSheet,
  View,
  Animated,
  ViewStyle,
  Easing,
} from 'react-native';
import {colors} from '../../config/colors';

export type SkeletonProps = {
  width: number | string;
  height: number;
  variant?: 'box' | 'circle';
};

export const Skeleton = ({width, height, variant = 'box'}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  const borderRadius = variant === 'circle' ? 50 : 10;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.view,
        {
          height: height,
          width: typeof width === 'string' ? `${Number(width)}%` : width,
          borderRadius: borderRadius,
          opacity: opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.textPlaceholder,
  },
});

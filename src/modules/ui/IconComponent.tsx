import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconsNames} from '../../config/constants';
import {colors} from '../../config/colors';

export type IconProps = {
  iconName: IconsNames;
  size?: number;
  color?: string;
};

export const IconComponent = ({iconName, size, color}: IconProps) => {
  return (
    <Icon
      name={iconName}
      size={size ? size : 30}
      color={color ? color : colors.textMain}
    />
  );
};

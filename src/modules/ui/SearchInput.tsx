import React from 'react';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {BaseInput, BaseInputProps} from './BaseInput';
import {IconComponent} from './IconComponent';

export type SearchInputProps = BaseInputProps;

export const SearchInput = ({...rest}: SearchInputProps) => {
  return (
    <BaseInput placeholder="Search" type="small" {...rest}>
      <IconComponent
        iconName={IconsNames.SEARCH}
        color={colors.secondary}
        size={24}
      />
    </BaseInput>
  );
};

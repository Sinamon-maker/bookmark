import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {SelectCompound} from '../../modules/select/SelectCompound';
import {IconComponent} from '../../modules/ui/IconComponent';
import {AppButton} from '../../modules/ui/AppButton';

type SelectOption = {
  title: string;
  id: string;
};

export type FilterComponentProps = {
  options: SelectOption[];
  onPress: () => void;
  placeholder?: string;
  selected?: string;
  onSelect?: (val: string) => void;
};

export const FilterComponent = ({
  options,
  onPress,
  selected,
  placeholder = '',
  onSelect,
}: FilterComponentProps) => {
  const pressSelect = (val: string) => {
    onSelect && onSelect(val);
  };
  return (
    <View style={styles.filterWrap}>
      <SelectCompound
        onSelect={pressSelect}
        selected={selected}
        placeholder={placeholder}
        options={options}
        disabled={options.length === 0}
        width={70}
      />
      <AppButton btnStyles={{paddingVertical: 0}} onPress={onPress}>
        <IconComponent
          iconName={IconsNames.ARROW_RIGHT}
          color={colors.textMain}
        />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

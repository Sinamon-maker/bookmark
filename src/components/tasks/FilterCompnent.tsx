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
  selected?: string;
};

export const FilterComponent = ({
  options,
  onPress,
  selected,
}: FilterComponentProps) => {
  const [selected2, setSelected2] = useState('');
  const onSelect2 = (val: string) => {
    setSelected2(val);
  };
  return (
    <View style={styles.filterWrap}>
      <SelectCompound
        onSelect={onSelect2}
        selected={selected}
        placeholder="Choose folder"
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

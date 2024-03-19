import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/colors';
import {IconsNames} from '../../../config/constants';
import {IconComponent} from '../../ui/IconComponent';
import {SelectContext} from './SelectRoot';

export type SelectItemProps = {
  id: string;
  value: string;
  label?: string;
};

export const SelectItem = ({id, value, label = value}: SelectItemProps) => {
  const {innerSelected, toggleSelect, handleSelect} = useContext(SelectContext);

  const onItemPress = (val: string, lab: string) => {
    handleSelect(val, lab);
    toggleSelect();
  };
  return (
    <Pressable key={id} onPress={() => onItemPress(value, label)}>
      <View style={styles.itemWrap}>
        <Text style={styles.itemText}>{label}</Text>
        {label === innerSelected && (
          <IconComponent
            iconName={IconsNames.CHECK}
            color={colors.secondary}
            size={20}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemText: {
    flex: 1,
    color: colors.textDark,
    fontSize: 16,
    lineHeight: 20,
  },
  itemWrap: {
    padding: 2,
    paddingRight: 10,
    backgroundColor: colors.superLight,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

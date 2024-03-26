import React, {useContext} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../config/colors';
import {IconsNames} from '../../../config/constants';
import {IconComponent} from '../../ui/IconComponent';
import {font} from '../../../config/fonts';
import {SelectContext} from './SelectRoot';

export type SelectTriggerPros = {
  iconDecorationName?: IconsNames;
  placeholderText?: string;
  disabled?: boolean;
  initialValue?: string;
};

export const SelectTrigger = ({
  iconDecorationName,
  placeholderText,
  disabled = false,
  initialValue,
}: SelectTriggerPros) => {
  const {DropdownButton, selected, toggleSelect, innerSelected} =
    useContext(SelectContext);
  return (
    <TouchableOpacity
      ref={DropdownButton}
      onPress={toggleSelect}
      activeOpacity={0.8}>
      <View style={[styles.inputWrap, {opacity: disabled ? 0.4 : 1}]}>
        {iconDecorationName && (
          <IconComponent iconName={iconDecorationName} size={28} />
        )}
        <Text
          style={[
            styles.inputText,
            {
              color:
                innerSelected || selected
                  ? colors.textMain
                  : colors.textPlaceholder,
            },
          ]}>
          {selected || innerSelected ? initialValue : placeholderText}
        </Text>
        <IconComponent iconName={IconsNames.UNFOLD} size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 12,
  },

  contentButton: {
    width: '100%',
    height: '100%',
  },

  inputText: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: font.InterRegular,
    fontSize: 16,
    lineHeight: 20,
  },

  itemText: {
    flex: 1,
    color: colors.textDark,
    fontSize: 16,
    lineHeight: 20,
  },
});

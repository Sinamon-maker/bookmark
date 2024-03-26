import React, {useEffect, useState} from 'react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from './components';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IconsNames} from '../../config/constants';
import {IconComponent} from '../ui/IconComponent';

type SelectOption = {
  title: string;
  id: string;
};

export type SelectCompoundProps = {
  iconDecorationName?: IconsNames;
  placeholder: string;
  options: SelectOption[] | undefined;
  disabled?: boolean;
  selected?: string;
  onSelect?: (val: string) => void;
  width?: number;
};

export const SelectCompound = ({
  options,
  onSelect,
  selected,
  iconDecorationName,
  placeholder,
  disabled = false,
  width = 100,
}: SelectCompoundProps) => {
  const getInitialValue = () => {
    if (selected) {
      const initial = options?.find(option => {
        if (typeof option === 'string') {
          return option === selected;
        } else {
          return option.id === selected;
        }
      });
      if (initial) {
        if (typeof initial === 'string') {
          return initial;
        } else {
          console.log('hfhjfjh', initial.title);
          return initial.title;
        }
      }
    }

    return '';
  };

  return (
    <SelectRoot
      onSelect={onSelect}
      initialValue={getInitialValue()}
      selected={selected}
      disabled={disabled}
      width={width}>
      <SelectTrigger
        iconDecorationName={iconDecorationName}
        placeholderText={placeholder}
        disabled={disabled}
        initialValue={getInitialValue()}
      />
      <SelectContent>
        <FlatList
          data={options}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <SelectItem id={item.id} value={item.id} label={item.title} />
            );
          }}
        />
      </SelectContent>
    </SelectRoot>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: 'auto',
    maxHeight: 600,
  },
});

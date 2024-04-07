import React from 'react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from './components';
import {FlatList} from 'react-native';
import {IconsNames} from '../../config/constants';

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
          style={{marginBottom: 16}}
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

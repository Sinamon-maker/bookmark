import React, {useEffect, useState} from 'react';
import {
  Animated,
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export type SelectContextType = {
  open: boolean;
  toggleSelect: () => void;
  handleSelect: (val: string, label: string) => void;
  innerSelected: string;
  selected?: string;
  fadeAnim: Animated.Value | number;
  DropdownButton: React.RefObject<TouchableOpacity> | null;
  dropdownTop: DimensionValue;
  wi: DimensionValue;
};

export const SelectContext = React.createContext<SelectContextType>({
  open: false,
  toggleSelect: () => {},
  handleSelect: () => {},
  innerSelected: '',
  selected: '',
  fadeAnim: 0,
  DropdownButton: null,
  dropdownTop: 0,
  wi: 0,
});

export type SelectRootProps = {
  children: React.ReactNode;
  onSelect?: (val: string) => void;
  selected?: string;
  disabled?: boolean;
  width?: number;
  initialValue: string;
};

export const SelectRoot = ({
  children,
  onSelect,
  selected,
  disabled = false,
  width = 100,
  initialValue,
}: SelectRootProps) => {
  const [innerSelected, setSelected] = useState<
    {id: string; title: string} | string
  >(selected ? selected : '');

  const [open, setOpen] = useState(false);
  const DropdownButton = React.useRef<TouchableOpacity>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [dropdownTop, setDropdownTop] = useState(0);
  const [wi, setWidth] = useState(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {});
  };

  const closeSelect = () => {
    fadeIn();
    setOpen(false);
  };

  const openSelect = () => {
    fadeOut();
    setOpen(true);
  };

  const toggleSelect = () => {
    if (!disabled) {
      open ? closeSelect() : onOpenSelect();
    }
  };

  const onOpenSelect = (): void => {
    if (DropdownButton && DropdownButton.current) {
      DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);

        setWidth(_w);
      });
      openSelect();
    }
  };
  const handleSelect = (val: string, label: string) => {
    setSelected(label);
    onSelect && onSelect(val);
  };
  console.log('innerSelected', initialValue, innerSelected);
  return (
    <SelectContext.Provider
      value={{
        toggleSelect,
        open,
        handleSelect,
        innerSelected,
        selected,
        fadeAnim,
        DropdownButton,
        dropdownTop,
        wi,
      }}>
      <View
        style={[
          styles.selectWrap,
          {
            overflow: !open ? 'hidden' : 'visible',
            width: width ? `${width}%` : '100%',
          },
        ]}>
        {children}
      </View>
    </SelectContext.Provider>
  );
};

const styles = StyleSheet.create({
  selectWrap: {
    marginBottom: 8,
    // zIndex: 40,
  },
});

import React, {useRef} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';

import {useState} from 'react';
import {IconsNames} from '../../config/constants';
import {IconComponent} from '../ui/IconComponent';
import {colors} from '../../config/colors';
import {font} from '../../config/fonts';

type SelectOption = {
  title: string;
  id: string;
};

type SelectProps = {
  iconDecorationName?: IconsNames;
  placeholder: string;
  options: SelectOption[] | undefined;
  selected: string;
  onSelect?: (val: string) => void;
};

export const Select = ({
  options,
  selected,
  onSelect,
  iconDecorationName,
  placeholder,
}: SelectProps) => {
  const [innerSelected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const DropdownButton = useRef<TouchableOpacity>(null);
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

  const closeDropdown = () => {
    fadeIn();
    setOpen(false);
  };

  const openDropdown = () => {
    fadeOut();
    setOpen(true);
  };

  const toggleDropdown = () => {
    open ? closeDropdown() : onOpenDropdown();
  };
  const onItemPress = (item?: SelectOption): void => {
    const res = item ? item.id : '';
    setSelected(res);
    onSelect && onSelect(res);
    closeDropdown();
  };
  const onOpenDropdown = (): void => {
    if (DropdownButton && DropdownButton.current) {
      DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);

        setWidth(_w);
      });
      openDropdown();
    }
  };

  const placeholderText = () => {
    if (selected || innerSelected) {
      const res = options?.find(option => option.id === selected);

      if (res) {
        return res.title;
      }
    }
    return placeholder;
  };

  return (
    <View style={[styles.selectWrap, {overflow: !open ? 'hidden' : 'visible'}]}>
      <TouchableOpacity
        ref={DropdownButton}
        onPress={toggleDropdown}
        activeOpacity={0.8}>
        <View style={styles.inputWrap}>
          {iconDecorationName && (
            <IconComponent iconName={iconDecorationName} size={28} />
          )}
          <Text
            style={[
              styles.inputText,
              {
                color:
                  selected || innerSelected
                    ? colors.textMain
                    : colors.textPlaceholder,
              },
            ]}>
            {placeholderText()}
          </Text>
          <IconComponent iconName={IconsNames.UNFOLD} size={18} />
        </View>
      </TouchableOpacity>
      {open && options && (
        <Modal visible={open} transparent animationType="none">
          <TouchableOpacity
            onPress={() => toggleDropdown()}
            style={styles.contentButton}>
            <Animated.View
              style={[
                styles.content,
                {opacity: fadeAnim},
                Platform.OS === 'ios'
                  ? styles.shadowIosProp
                  : styles.elevationAndroid,
                {height: !open ? 0 : 'auto'},
                {top: dropdownTop, width: wi},
              ]}>
              <ScrollView
                contentContainerStyle={{height: 'auto'}}
                nestedScrollEnabled={true}
                style={styles.scrollView}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always">
                {options &&
                  options.map(item => (
                    <Pressable key={item.id} onPress={() => onItemPress(item)}>
                      <View style={styles.itemWrap}>
                        <Text style={styles.itemText}>{item.title}</Text>
                        {item.id === selected && (
                          <IconComponent
                            iconName={IconsNames.CHECK}
                            color={colors.secondary}
                            size={20}
                          />
                        )}
                      </View>
                    </Pressable>
                  ))}
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectWrap: {
    width: '100%',
    marginBottom: 8,
    // zIndex: 40,
  },

  inputWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 12,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    color: 'green',
    fontSize: 16,
    lineHeight: 20,
  },
  contentButton: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    paddingLeft: 16,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    backgroundColor: colors.superLight,
    overflow: 'hidden',
    position: 'absolute',
    height: 'auto',
    maxHeight: '70%',
    marginLeft: 16,
  },
  scrollView: {
    height: 'auto',
    maxHeight: 600,
  },
  shadowIosProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 0.14,
    shadowRadius: 4,
  },
  elevationAndroid: {
    elevation: 14,
    shadowColor: '#000000',
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
  itemWrap: {
    padding: 2,
    paddingRight: 10,
    backgroundColor: colors.superLight,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

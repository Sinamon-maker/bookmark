import React, {PropsWithChildren, useContext} from 'react';
import {
  Modal,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../config/colors';
import {SelectContext} from './SelectRoot';

export const SelectContent = ({children}: PropsWithChildren) => {
  const {fadeAnim, open, toggleSelect, dropdownTop, wi} =
    useContext(SelectContext);
  return (
    <>
      {open && (
        <Modal visible={open} transparent animationType="none">
          <TouchableOpacity
            onPress={() => toggleSelect()}
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
              {children}
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
});

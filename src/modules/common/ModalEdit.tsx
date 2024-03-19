import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../config/colors';
import {BaseInput} from '../ui/BaseInput';
import {AppButton} from '../ui/AppButton';
import {font, size} from '../../config/fonts';

export type ModalAddProps = {
  closeModal: () => void;
  modalFolderOpen: boolean;
  placeholder: string;
  previousValue: string;
  submit: (val: string) => void;
};

export const ModalEdit = ({
  closeModal,
  modalFolderOpen,
  previousValue,
  placeholder,
  submit,
}: ModalAddProps) => {
  const [value, setValue] = useState('');

  const onSubmit = () => {
    submit(value);
  };
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalFolderOpen}
      onRequestClose={closeModal}
      onDismiss={closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.textHeading}>
            <Text style={styles.textPrefix}>From:</Text>
            <Text style={styles.textName}>{previousValue}</Text>
          </View>
          <BaseInput
            placeholder={placeholder}
            value={value}
            onChangeText={text => setValue(text)}
          />
          <View style={styles.modalSeparator} />
          <View style={styles.modalFooter}>
            <AppButton
              text="Cancel"
              btnStyles={styles.buttonCancel}
              textStyles={styles.buttonText}
              onPress={closeModal}
            />
            <AppButton
              text="Save"
              btnStyles={styles.buttonSave}
              textStyles={styles.buttonText}
              disabled={value.length < 3}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'relative',
    borderRadius: 10,
    flex: 1,
    backgroundColor: colors.modalBackground,
    // opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    //  position: 'absolute',
    width: '90%',
    backgroundColor: colors.superLight,
    borderRadius: 10,
    padding: 8,
    zIndex: 10,
  },
  textHeading: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingLeft: 8,
    marginVertical: 10,
    gap: 6,
  },
  textPrefix: {
    color: colors.textPlaceholder,
    fontFamily: font.InterSemiBold,
    textDecorationLine: 'underline',
    ...size.base,
  },
  textName: {
    color: colors.textDark,
    fontFamily: font.InterRegular,
    ...size.base,
  },
  modalSeparator: {
    width: '100%',
    height: 2,
    backgroundColor: colors.primary,
    marginVertical: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  buttonCancel: {
    paddingVertical: 4,
    backgroundColor: colors.secondary,
    paddingHorizontal: 6,
  },
  buttonSave: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  buttonText: {
    fontFamily: font.InterSemiBold,
    ...size.base,
  },
});

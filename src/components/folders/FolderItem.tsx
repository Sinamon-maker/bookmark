import React, {useState} from 'react';
import {View, Platform, Text, StyleSheet, Alert, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {font, size} from '../../config/fonts';
import {ModalEdit} from '../../modules/common/ModalEdit';
import {Folder} from '../../config/types';
import {MyContextMenu} from '../../modules/common/ContextMenu';
import {alertText} from '../../utils';

export type FolderItemProps = {
  folder: Folder;
  isActiveFolder?: boolean;
  setActiveFolder?: (val: string) => void;
  deleteFolder: (val: string) => void;
  editFolder: (val: string, id: string) => void;
};

export const FolderItem = ({
  folder,
  isActiveFolder = false,
  setActiveFolder,
  deleteFolder,
  editFolder,
}: FolderItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const submit = (val: string) => {
    editFolder(val, folder.id);
    setModalOpen(false);
  };

  const onPressFolder = () => {
    setActiveFolder && setActiveFolder(folder.id);
  };

  const onPressDelete = () => {
    Alert.alert(alertText.deleteTitle, alertText.deleteFolder, [
      {text: 'No'},
      {text: 'Yes', onPress: () => deleteFolder(folder.id)},
    ]);
  };
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={[
            styles.folderItemWrap,
            Platform.OS === 'ios'
              ? styles.shadowIosProp
              : styles.elevationAndroid,
          ]}>
          <View style={styles.menuBtn}>
            <MyContextMenu
              contextMenuData={[
                {title: 'edit', func: () => setModalOpen(true)},
                {title: 'delete', func: () => onPressDelete()},
              ]}
            />
          </View>
          <AppButton btnStyles={styles.btnFolderStyles} onPress={onPressFolder}>
            <IconComponent
              iconName={
                isActiveFolder ? IconsNames.OPENFOLDER : IconsNames.FOLDER
              }
              color={colors.secondary}
              size={40}
            />
          </AppButton>
          <Text style={styles.text}>{folder.title}</Text>
        </View>
      </View>
      <ModalEdit
        modalFolderOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        placeholder="Enter new name"
        previousValue={folder.title}
        submit={submit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  folderItemWrap: {
    position: 'relative',
    borderRadius: 10,
    padding: 6,
    backgroundColor: colors.primary,
    width: 120,
    height: 120,
    alignItems: 'center',
    overflow: 'hidden',
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
  btnFolderStyles: {
    marginTop: 6,
    paddingVertical: 0,
    padding: 6,
  },
  menuBtn: {
    position: 'absolute',
    right: 10,
    top: 6,
  },
  text: {
    color: colors.textMain,
    marginTop: 10,
    fontFamily: font.InterSemiBold,
    ...size.base,
  },
});

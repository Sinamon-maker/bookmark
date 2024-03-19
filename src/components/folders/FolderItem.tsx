import React, {useState} from 'react';
import {View, Platform, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {font, size} from '../../config/fonts';
import {ModalEdit} from '../../modules/common/ModalEdit';
import {Folder} from '../../config/types';
import {MyContextMenu} from '../../modules/common/ContextMenu';

export type FolderItemProps = {
  folder: Folder;
};

export const FolderItem = ({folder}: FolderItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const submit = (val: string) => {
    console.log('new folder', val);
  };

  const onEdit = () => {
    Alert.alert(
      'Deliting',
      'Are you shure yuo are going to delete folder? All catalogues and tasks will be deleted too.',
      [{text: 'No'}, {text: 'Yes', onPress: () => console.log('delete')}],
    );
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
                {title: 'delete', func: () => onEdit()},
              ]}
            />
          </View>
          <View style={{marginTop: 10}}>
            <IconComponent
              iconName={IconsNames.FOLDER}
              color={colors.secondary}
              size={40}
            />
          </View>
          <Text style={styles.text}>jhgjkgkjkgj nbvhv nbvhjhjv</Text>
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

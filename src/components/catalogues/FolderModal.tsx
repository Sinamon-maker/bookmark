import React, {useState} from 'react';
import {FlatList, Modal, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {SearchInput} from '../../modules/ui/SearchInput';
import {EmptyComponent} from '../../modules/common/EmptyComponent';

import {Folder} from '../../config/types';
import {emptyText} from '../../utils';

export type FolderModalProps = {
  folders: Folder[];
  modalFolderOpen: boolean;
  closeModal: () => void;
  activeFolder?: string;
  setActiveFolder: (val: string) => void;
};

export const FolderModal = ({
  modalFolderOpen,
  closeModal,
  folders,
  activeFolder,
  setActiveFolder,
}: FolderModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (val: string) => {
    setSearchQuery(val);
  };

  const selectFolder = (val: string) => {
    setActiveFolder(val);
    console.log('select folder');
    closeModal();
  };
  const filteredFilders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalFolderOpen}
      onRequestClose={closeModal}
      onDismiss={closeModal}>
      <View style={styles.modalBackground} />
      <View style={styles.modalWrap}>
        <AppButton btnStyles={styles.btnCloseModal} onPress={closeModal}>
          <IconComponent
            iconName={IconsNames.CLOSE}
            color={colors.textInput}
            size={18}
          />
        </AppButton>
        {folders.length > 3 && (
          <SearchInput
            width={90}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        )}
        <FlatList
          ListEmptyComponent={<EmptyComponent title={emptyText.notFound} />}
          style={{borderRadius: 8}}
          data={filteredFilders}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.folderItem}>
              <AppButton
                text={item.title}
                btnStyles={styles.btnFolder}
                textStyles={styles.textFolder}
                onPress={() => selectFolder(item.id)}>
                <IconComponent
                  iconName={
                    item.id === activeFolder
                      ? IconsNames.OPENFOLDER
                      : IconsNames.FOLDER
                  }
                  color={colors.secondary}
                />
              </AppButton>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: colors.textDark,
    opacity: 0.4,
  },
  modalWrap: {
    maxHeight: '50%',
    position: 'relative',
    width: '100%',
    backgroundColor: colors.superLight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 25,
    paddingBottom: 40,
    gap: 10,
  },
  folderItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  btnCloseModal: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: -10,
    top: -15,
  },
  btnFolder: {
    alignSelf: 'flex-start',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  textFolder: {
    color: colors.textDark,
    marginLeft: 10,
  },
});

import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, FlatList} from 'react-native';
import {colors} from '../../config/colors';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {CatalogueItem} from '../../components/catalogues/CatalogueItem';
import {SearchInput} from '../../modules/ui/SearchInput';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {IconsNames} from '../../config/constants';
import {BaseInput} from '../../modules/ui/BaseInput';
import {font, size} from '../../config/fonts';
import {FolderModal} from '../../components/catalogues/FolderModal';
import {FolderChooseButton} from '../../components/catalogues/FolderChooseButton';
import {folders} from '../../data/data';
import {InputAdd} from '../../modules/common/InputAdd';
import {catalogues} from '../../data/data';
import {EmptyComponent} from '../../modules/common/EmptyComponent';
import {Separator} from '../../modules/common/Separator';

export const CataloguesScreen = () => {
  const [modalFolderOpen, setModalFolderOpen] = useState(false);
  const openModal = () => {
    setModalFolderOpen(true);
  };
  const closeModal = () => {
    setModalFolderOpen(false);
  };
  return (
    <>
      <ScreenWrapper>
        <View style={styles.screenWrap}>
          <SearchInput />
          <FolderChooseButton onPress={openModal} />
          <View style={{flex: 1}}>
            <FlatList
              ListEmptyComponent={<EmptyComponent title="Catalogues" />}
              style={{borderRadius: 8}}
              data={catalogues}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <CatalogueItem data={item} index={index} />
              )}
            />
          </View>
          <InputAdd
            placeholder="Add new catalogue"
            submit={val => console.log(`submit ${val}`)}
          />
        </View>
      </ScreenWrapper>
      <FolderModal modalFolderOpen={modalFolderOpen} closeModal={closeModal} />
    </>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    padding: 16,
    backgroundColor: colors.mainBack,
    height: '100%',
  },
});

import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {colors} from '../../config/colors';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {CatalogueItem} from '../../components/catalogues/CatalogueItem';
import {SearchInput} from '../../modules/ui/SearchInput';

import {CollectionNames, SortCataloguesParam} from '../../config/constants';

import {FolderModal} from '../../components/catalogues/FolderModal';
import {FolderChooseButton} from '../../components/catalogues/FolderChooseButton';

import {InputAdd} from '../../modules/common/InputAdd';

import {EmptyComponent} from '../../modules/common/EmptyComponent';
import userStore from '../../store/userStore';
import useCatalogueStore from '../../store/useCatalogueStore';
import {useCreateData} from '../../api/useCreateData';
import {useGetDataById} from '../../api/useGetDataById';
import {Data, Folder} from '../../config/types';
import {emptyText, onSelectCatalogue, onSelectFolder} from '../../utils';
import {useUpdateData} from '../../api/useUpdateData';
import {CatalogueFilters} from '../../components/catalogues/CatalogueFilters';

export const CataloguesScreen = () => {
  const [modalFolderOpen, setModalFolderOpen] = useState(false);
  const [query, setQuery] = useState(SortCataloguesParam.CURRENT);
  const user = userStore(s => s.user);
  const activeCatalogue = useCatalogueStore(s => s.activeCatalogue);
  const activeFolder = useCatalogueStore(s => s.activeFolder);
  const [searchQuery, setSearchQuery] = useState('');
  const {deleteData, updateData} = useUpdateData();

  const successCreateCallback = async (id: string) => {
    await onSelectCatalogue(id);
  };
  const {err, loading, createData} = useCreateData(successCreateCallback);
  const {data: folders} = useGetDataById<Folder>(
    CollectionNames.FOLDERS,
    user?.uid,
  );
  const {data: catalogues} = useGetDataById<Data>(
    CollectionNames.Catalogues,
    user?.uid,
  );

  const filteredByFolderCatalogues = catalogues.filter(
    catalogue => catalogue.folderId === activeFolder,
  );
  const filteredBySortingParam = filteredByFolderCatalogues.filter(
    catalogue => {
      if (query === SortCataloguesParam.ARCHIVED) {
        return catalogue.archived;
      }
      if (query === SortCataloguesParam.CURRENT) {
        return !catalogue.archived;
      }
      return catalogue;
    },
  );

  const filteredCatalogues = filteredBySortingParam.filter(catalogue =>
    catalogue.title.toLowerCase().includes(searchQuery),
  );
  const activeFolderTitle = folders.find(folder => folder.id === activeFolder);

  const onChangeSearch = (val: string) => {
    setSearchQuery(val);
  };
  const openModal = () => {
    setModalFolderOpen(true);
  };
  const closeModal = () => {
    setModalFolderOpen(false);
  };
  const onAdd = (val: string) => {
    const catalogueNew = {
      title: val,
      userId: user?.uid,
      displayName: user?.displayName,
      createdAt: +new Date(),
      tasks: [],
      folderId: activeFolder,
      archived: false,
    };

    const res = createData(CollectionNames.Catalogues, catalogueNew);
    return res;
  };
  const deleteCatalogue = async (id: string) => {
    deleteData(CollectionNames.Catalogues, id);
    if (activeCatalogue === id) {
      await onSelectCatalogue('');
    }
  };
  const editCatalogue = (val: string, id: string) => {
    updateData(CollectionNames.Catalogues, {title: val}, id);
  };

  const archiveCatalogue = (id: string) => {
    updateData(CollectionNames.Catalogues, {archived: true}, id);
  };

  const onPressSort = (sortParam: SortCataloguesParam) => {
    setQuery(sortParam);
  };

  return (
    <>
      <ScreenWrapper>
        <View style={styles.screenWrap}>
          {catalogues.length > 3 && (
            <SearchInput onChangeText={onChangeSearch} />
          )}

          <FolderChooseButton
            onPress={openModal}
            text={activeFolderTitle ? activeFolderTitle.title : 'Choose folder'}
          />
          <CatalogueFilters query={query} onPressSort={onPressSort} />

          <View style={{flex: 1}}>
            <FlatList
              ListEmptyComponent={
                <EmptyComponent
                  title={
                    catalogues.length === 0
                      ? emptyText.noCatalogues
                      : emptyText.noFilteredCatalogues
                  }
                />
              }
              style={{borderRadius: 8, paddingRight: 6}}
              data={filteredCatalogues}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <CatalogueItem
                  data={item}
                  index={index}
                  activeCatalogue={activeCatalogue}
                  onPressCatalogue={onSelectCatalogue}
                  onDeleteCatalogue={deleteCatalogue}
                  onEditCatalogue={editCatalogue}
                  onArchiveCatalogue={archiveCatalogue}
                />
              )}
            />
          </View>
          <InputAdd
            placeholder="Add new catalogue"
            submit={val => onAdd(val)}
          />
        </View>
      </ScreenWrapper>
      <FolderModal
        modalFolderOpen={modalFolderOpen}
        closeModal={closeModal}
        folders={folders.sort((a, b) => a.createdAt - b.createdAt)}
        activeFolder={activeFolder}
        setActiveFolder={onSelectFolder}
      />
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

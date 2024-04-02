import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from '../../config/colors';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {SearchInput} from '../../modules/ui/SearchInput';

import {FolderItem} from '../../components/folders/FolderItem';
import {InputAdd} from '../../modules/common/InputAdd';

import {EmptyComponent} from '../../modules/common/EmptyComponent';

import {SeparatorFolders} from '../../components/folders/SeparatorFolders';
import {useGetDataById} from '../../api/useGetDataById';
import {CollectionNames} from '../../config/constants';
import {Folder} from '../../config/types';
import userStore from '../../store/userStore';
import useCatalogueStore from '../../store/useCatalogueStore';
import {emptyText} from '../../utils';
import {useCreateData} from '../../api/useCreateData';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import {useUpdateData} from '../../api/useUpdateData';

export const FolderScreen = () => {
  const user = userStore(s => s.user);
  const activeFolder = useCatalogueStore(s => s.activeFolder);
  const setActiveFolder = useCatalogueStore(s => s.setActiveFolder);
  const setActiveCatalogue = useCatalogueStore(s => s.setActiveCatalogue);
  const [searchQuery, setSearchQuery] = useState('');

  const successCreateCallback = (id: string) => {
    setActiveFolder(id);
  };
  const {err, loading, createData} = useCreateData(successCreateCallback);
  const {
    err: errDel,
    deleteData,
    massDeleteCatalogues,
    updateData,
  } = useUpdateData();
  const {data: folders} = useGetDataById<Folder>(
    CollectionNames.FOLDERS,
    user?.uid,
  );

  const filteredFolders = folders
    .sort((a, b) => a.createdAt - b.createdAt)
    .filter(folder => folder.title.toLowerCase().includes(searchQuery));

  const onChangeSearch = (val: string) => {
    setSearchQuery(val);
  };

  const onChangeFolder = (name: string, idFolder: string) => {
    updateData(CollectionNames.FOLDERS, {title: name}, idFolder);
  };

  const onAdd = (val: string) => {
    const folderNew = {
      title: val,
      userId: user?.uid,
      createdAt: +new Date(),
    };
    const res = createData(CollectionNames.FOLDERS, folderNew);
    return res;
  };

  const onSelectFolder = (val: string) => {
    setActiveCatalogue('');
    setActiveFolder(val);
  };

  const deleteFolder = (val: string) => {
    deleteData(CollectionNames.FOLDERS, val);
    massDeleteCatalogues(CollectionNames.Catalogues, val);
  };
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        {folders.length > 3 && <SearchInput onChangeText={onChangeSearch} />}
        <View style={styles.listWrap}>
          <FlatList
            ListEmptyComponent={
              <EmptyComponent
                title={
                  folders.length === 0
                    ? emptyText.noFolders
                    : emptyText.notFound
                }
              />
            }
            style={styles.list}
            data={filteredFolders}
            horizontal={false}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.listItemWrap}>
                <FolderItem
                  folder={item}
                  isActiveFolder={item.id === activeFolder}
                  setActiveFolder={onSelectFolder}
                  deleteFolder={deleteFolder}
                  editFolder={onChangeFolder}
                />
              </View>
            )}
            ItemSeparatorComponent={SeparatorFolders}
          />
        </View>
        <ErrorComponent message={err} />
        <InputAdd placeholder="Add new folder" submit={onAdd} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainBack,
    padding: 10,
  },
  listWrap: {
    flex: 1,
  },
  list: {
    borderRadius: 6,
    width: '100%',
    marginVertical: 12,
  },
  listItemWrap: {
    width: '33.3%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
});

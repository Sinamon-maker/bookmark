import React, {ReactNode, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {TaskItem} from '../../components/tasks/TaskItem';
import {colors} from '../../config/colors';
import {TaskSorting} from '../../components/tasks/TaskSorting';
import {FilterComponent} from '../../components/tasks/FilterCompnent';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {tasks} from '../../data/data';
import {EmptyComponent} from '../../modules/common/EmptyComponent';
import {Separator} from '../../modules/common/Separator';
import {InputAdd} from '../../modules/common/InputAdd';
import {FirstEntry} from '../../components/tasks/FirstEntry';
import {emptyText, firstEntryText} from '../../utils';
import useCatalogueStore from '../../store/useCatalogueStore';
import userStore from '../../store/userStore';
import {useGetDataById} from '../../api/useGetDataById';
import {Data, Folder} from '../../config/types';
import {CollectionNames} from '../../config/constants';
import {folders2} from '../../data/data';
import {Select} from '../../modules/select/Select';
import {TaskContent} from '../../components/tasks/TasksContent';
import {LoaderScreen} from '../LoaderScreen';

export const folders3 = [
  {
    archived: false,
    createdAt: 1711108081432,
    displayName: 'piter',
    folder: 'VMh3qwwkWqauQfTQ02YZ',
    id: '74vPPVnIZlUDwwMl8wU0',
    tasks: [],
    title: 'RNproject',
    userId: 'f3pcxz8vuLeC6JFOb174hTsKsX63',
  },
  {
    createdAt: 1711102187946,
    id: 'VMh3qwwkWqauQfTQ02YZ',
    title: 'Favorites',
    userId: 'f3pcxz8vuLeC6JFOb174hTsKsX63',
  },
];

export const TasksScreen = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const user = userStore(s => s.user);
  const activeFolder = useCatalogueStore(s => s.activeFolder);
  const activeCatalogue = useCatalogueStore(s => s.activeCatalogue);
  const setActiveFolder = useCatalogueStore(s => s.setActiveFolder);
  const setActiveCatalogue = useCatalogueStore(s => s.setActiveCatalogue);
  const {data: catalogues, loading: loaderCatalogues} = useGetDataById<Data>(
    CollectionNames.Catalogues,
    user?.uid,
  );
  const {data: folders, loading: loaderFolders} = useGetDataById<Folder>(
    CollectionNames.FOLDERS,
    user?.uid,
  );

  const firstEntry = folders.length === 0 ? true : false;

  const navigateToCatalogues = () => {
    navigation.navigate('Catalogues');
  };

  const navigateToFolders = () => {
    navigation.navigate('Folders');
  };
  const filteredByFolderCatalogues = catalogues.filter(
    catalogue => catalogue.folderId === activeFolder,
  );

  const selectFolder = (val: string) => {
    setActiveFolder(val);
    setActiveCatalogue('');
  };

  const emptyTextRender = (folder: string, catalogue: string): ReactNode => {
    if (!folder) {
      return (
        <FirstEntry
          text={emptyText.chooseFolder}
          onPressStart={navigateToFolders}
        />
      );
    } else if (filteredByFolderCatalogues.length === 0) {
      return (
        <FirstEntry
          text={firstEntryText.createCatalogueText}
          onPressStart={navigateToCatalogues}
        />
      );
    } else if (!catalogue) {
      return (
        <FirstEntry
          text={emptyText.chooseCatalogue}
          onPressStart={navigateToCatalogues}
        />
      );
    } else {
      return null;
    }
  };
  if (loaderFolders && loaderCatalogues) {
    return <LoaderScreen />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <FilterComponent
          options={folders.sort((a, b) => a.createdAt - b.createdAt)}
          onPress={navigateToFolders}
          selected={activeFolder}
          placeholder="Choose folder"
          onSelect={selectFolder}
        />

        <FilterComponent
          options={filteredByFolderCatalogues}
          selected={activeCatalogue}
          onPress={navigateToCatalogues}
          placeholder="Choose Catalogue"
          onSelect={setActiveCatalogue}
        />
        {firstEntry ? (
          <FirstEntry
            onPressStart={navigateToFolders}
            text={firstEntryText.createFolderText}
          />
        ) : (
          emptyTextRender(activeFolder, activeCatalogue)
        )}

        {activeFolder && activeCatalogue && (
          <TaskContent activeCatalogue={activeCatalogue} />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    padding: 12,
    backgroundColor: colors.mainBack,
    height: '100%',
    width: '100%',
  },
});

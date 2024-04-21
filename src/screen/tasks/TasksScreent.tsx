import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';

import {colors} from '../../config/colors';

import {FilterComponent} from '../../components/tasks/FilterCompnent';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';

import {FirstEntry} from '../../components/tasks/FirstEntry';
import {
  emptyText,
  firstEntryText,
  onSelectCatalogue,
  onSelectFolder,
} from '../../utils';
import useCatalogueStore from '../../store/useCatalogueStore';
import userStore from '../../store/userStore';
import {useGetDataById} from '../../api/useGetDataById';
import {Data, Folder} from '../../config/types';
import {CollectionNames} from '../../config/constants';

import {TaskContent} from '../../components/tasks/TasksContent';
import {LoaderScreen} from '../LoaderScreen';

export const TasksScreen = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const user = userStore(s => s.user);
  const activeFolder = useCatalogueStore(s => s.activeFolder);
  const activeCatalogue = useCatalogueStore(s => s.activeCatalogue);

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
          onSelect={onSelectFolder}
        />

        <FilterComponent
          options={filteredByFolderCatalogues}
          selected={activeCatalogue}
          onPress={navigateToCatalogues}
          placeholder="Choose Catalogue"
          onSelect={onSelectCatalogue}
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import useCatalogueStore from '../store/useCatalogueStore';

export const firstEntryText = {
  createFolderText:
    ' Here will be your list of tasks. First, create a Folder or several Folders. In every folder can be several catalogues that contain your tasks. Folders can be ranamed if you do not choose suitable name from the beginning. Press button to start.',
  createCatalogueText:
    'No Catalogues in current folder. Create a Catalogue for your tasks. Press button to start.',
};

export const emptyText = {
  noFolders: 'No folders yet. Start creating!',
  notFound: 'Nothing found',
  noCatalogues: 'No Catalogues yet. Start creating!',
  noFilteredCatalogues: 'No catalogues',
  noTasksWithinCatalogue: 'No tasks within this catalogue',
  noTasks: 'No tasks',
  chooseCatalogue: 'Choose a Catalogue or create new one',
  chooseFolder: 'Choose folder',
};

export const alertText = {
  deleteTitle: 'Deleting!',
  deleteFolder:
    'Are you sure yuo are going to delete folder? All catalogues and tasks will be deleted too.',
  deleteCatalogue:
    'Are you shure yuo are going to delete Catalogue? All tasks will be deleted too.',
  deleteTask: 'Are you sure you going to delete this task?',
  archivation: 'Atention!',
  archiveWithNoTasks: 'You can not archive catalog without task',
  archiveWithTasks:
    'This is a one way operation. You can not get archived catalogue to current back again',
};

export const convertTime = (date: number) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDay();
  const hours =
    new Date(date).getHours() < 10
      ? `0${new Date(date).getHours()}`
      : new Date(date).getHours();
  const min = new Date(date).getMinutes();

  return `${year}-${month}-${day} ${hours}:${min}`;
};

export const setToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    if (error instanceof Error) {
      crashlytics().recordError(error);
    }
  }
};

export const onSelectFolder = async (val: string) => {
  useCatalogueStore.setState({activeFolder: val});
  useCatalogueStore.setState({activeCatalogue: ''});
  await setToStorage('activeFolder', val);
  await setToStorage('activeCatalogue', '');
};

export const onSelectCatalogue = async (val: string) => {
  useCatalogueStore.setState({activeCatalogue: val});

  await setToStorage('activeCatalogue', val);
};

import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

export interface CatalogueStoreProp {
  activeFolder: string;
  activeCatalogue: string;
  setActiveFolder: (id: string) => void;
  setActiveCatalogue: (val: string) => void;
  init: () => void;
}

const useCatalogueStore = create<CatalogueStoreProp>(set => ({
  activeFolder: '',
  activeCatalogue: '',
  setActiveFolder: id => set(() => ({activeFolder: id})),
  setActiveCatalogue: val => set(() => ({activeCatalogue: val})),
  init: async () => {
    try {
      const folderValue = await AsyncStorage.getItem('activeFolder');
      if (folderValue !== null) {
        set({activeFolder: folderValue});
      }
      const catalogueValue = await AsyncStorage.getItem('activeCatalogue');
      if (catalogueValue !== null) {
        set({activeCatalogue: catalogueValue});
      }
    } catch (e) {
      if (e instanceof Error) {
        crashlytics().recordError(e);
      }
    }
  },
}));

export default useCatalogueStore;

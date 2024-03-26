import {create} from 'zustand';

export interface CatalogueStoreProp {
  activeFolder: string;
  activeCatalogue: string;
  setActiveFolder: (id: string) => void;
  setActiveCatalogue: (val: string) => void;
}

const useCatalogueStore = create<CatalogueStoreProp>(set => ({
  activeFolder: '',
  activeCatalogue: '',
  setActiveFolder: id => set(() => ({activeFolder: id})),
  setActiveCatalogue: val => set(() => ({activeCatalogue: val})),
}));

export default useCatalogueStore;

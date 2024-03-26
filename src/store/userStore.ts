import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {create} from 'zustand';

export interface UserStoreProp {
  user: FirebaseAuthTypes.User | null;

  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const userStore = create<UserStoreProp>(set => ({
  user: null,
  setUser: user => set(() => ({user: user})),
}));

export default userStore;

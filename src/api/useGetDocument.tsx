import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const useGetDocument = <T,>(collectionName: string, docId: string) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const subscriber = firestore()
      .collection(collectionName)
      .doc(docId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setData(documentSnapshot.data() as T);
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [docId, collectionName]);

  return {data};
};

import {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

export const useGetDataById = <T>(collectionName: string, userId?: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection(collectionName)
      .where('userId', '==', userId)

      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const collectionResult = [] as T[];

          snapshot.forEach(documentSnapshot => {
            if (documentSnapshot && documentSnapshot.data()) {
              const docum = {
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              } as unknown as T;
              collectionResult.push(docum);
            }
          });
          setData(collectionResult);
          setLoading(false);
        } else {
          setData([]);
          setLoading(false);
        }
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [collectionName, userId]);

  return {data, loading};
};

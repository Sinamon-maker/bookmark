import {useState} from 'react';
import DocumentData from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';

export const useCreateData = <T>(func?: (id: string) => void) => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const createData = (collectionName: string, val: T) => {
    try {
      setLoading(true);
      firestore()
        .collection(collectionName)
        .add(val as typeof DocumentData)
        .then(newDoc => func && func(newDoc.id));
      setLoading(false);
      return 'ok';
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        crashlytics().recordError(error);
        setError(error.message);
      }
    }
  };

  return {loading, err, createData};
};

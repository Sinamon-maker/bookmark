import {useState} from 'react';
import DocumentData from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

export const useCreateData = <T>() => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const createData = (collectionName: string, val: T) => {
    try {
      setLoading(true);
      firestore()
        .collection(collectionName)
        .add(val as typeof DocumentData);
      setLoading(false);
      return 'ok';
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {loading, err, createData};
};

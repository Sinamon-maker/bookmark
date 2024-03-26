import {useState} from 'react';
import DocumentData from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

export const useUpdateData = <T>() => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const updateData = (collectionName: string, val: T, id?: string) => {
    try {
      setLoading(true);
      firestore()
        .collection(collectionName)
        .doc(id)
        .update(val as typeof DocumentData);
      setLoading(false);
      return 'ok';
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const deleteData = (collectionName: string, id: string) => {
    firestore()
      .collection(collectionName)
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  async function massDeleteUsers(collsectionName: string, filderId: string) {
    // Get all users
    const querySnapshot = await firestore()
      .collection(collsectionName)
      .where('folder', '==', filderId)
      .get();
    // Create a new batch instance
    const batch = firestore().batch();

    querySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });

    return batch.commit();
  }

  const massDeleteCatalogues = (collsectionName: string, filderId: string) => {
    massDeleteUsers(collsectionName, filderId).then(() =>
      console.log(
        'All catalogues from this folder deleted in a single batch operation.',
      ),
    );
  };

  return {loading, err, updateData, deleteData, massDeleteCatalogues};
};

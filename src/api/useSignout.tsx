import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const useSignout = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signout = async () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        console.log('User signout');
        setLoading(false);
      })
      .catch(error => {
        console.log(error.code, error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, signout, loading};
};

export default useSignout;

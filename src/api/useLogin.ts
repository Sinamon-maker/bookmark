import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const useLogin = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User successfuly registered!');
        setLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setError('Wrong cridentials');
          console.log(error.code, error);
        } else if (error.code === 'auth/user-not-found') {
          console.log(error.code, error);
          setError('User not found');
        } else if (error.code === 'auth/too-many-requests') {
          console.log(error.code, error);
          setError('Too many requests, try later or reset password');
        } else {
          console.log(error.code, error);
          setError('Something wrong, try later');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {err, login, loading, setError};
};

export default useLogin;

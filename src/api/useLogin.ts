import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const useLogin = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = async (email: string, password: string) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User successfuly registered!');
        setLoading(false);
      })
      .catch(error => {
        console.log(error.code, error);
        setError('User not found');
        setLoading(false);
      });
  };
  return {err, login, loading};
};

export default useLogin;

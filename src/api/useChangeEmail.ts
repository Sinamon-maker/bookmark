import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const useChangeEmail = (func: () => void) => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const changeEmail = async (
    email: string,
    password: string,
    newEmail: string,
  ) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => userCredentials.user?.updateEmail(newEmail))
      .then(() => {
        console.log('Email successfuly changed!');
        setLoading(false);
        func();
      })
      .catch(error => {
        console.log(error.code, error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, changeEmail, loading};
};

export default useChangeEmail;

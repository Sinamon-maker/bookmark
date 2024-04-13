import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {Logs} from '../config/constants';

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
        crashlytics().log(Logs.EMAIL_CHANGED);
        setLoading(false);
        func();
      })
      .catch(error => {
        crashlytics().recordError(error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, changeEmail, loading};
};

export default useChangeEmail;

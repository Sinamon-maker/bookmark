import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {Logs} from '../config/constants';

const useSignup = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signup = async (
    displayName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        console.log('User account created & signed in!', userCredentials.user);
        crashlytics().log(Logs.SIGNUP);
        setLoading(false);
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName,
          });
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setError('That email address is already in use!');
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError('That email address is invalid!');
          setLoading(false);
        }
        console.log(error.code, error);
        setError(error.message);
        setLoading(false);
      });
  };
  return {err, signup, loading};
};

export default useSignup;

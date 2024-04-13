import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {Logs} from '../config/constants';

const useSignout = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signout = async () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        crashlytics().log(Logs.SIGNOUT);
        console.log('User signout');
        setLoading(false);
      })
      .catch(error => {
        crashlytics().recordError(error);
        console.log(error.code, error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, signout, loading};
};

export default useSignout;

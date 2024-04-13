import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {Logs} from '../config/constants';

const useConfirmPasswordReset = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const confirmPasswordReset = async (code: string, newPassword: string) => {
    setLoading(true);
    auth()
      .confirmPasswordReset(code, newPassword)
      .then(() => {
        crashlytics().log(Logs.PASSWORD_CHANGED);
        console.log('User successfuly changed password!');
        setLoading(false);
      })
      .catch(error => {
        crashlytics().recordError(error);
        console.log(error.code, error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, confirmPasswordReset, loading};
};

export default useConfirmPasswordReset;

import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const useConfirmPasswordReset = () => {
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const confirmPasswordReset = async (code: string, newPassword: string) => {
    setLoading(true);
    auth()
      .confirmPasswordReset(code, newPassword)
      .then(() => {
        console.log('User successfuly changed password!');
        setLoading(false);
      })
      .catch(error => {
        console.log(error.code, error);
        setError('Sth wrong');
        setLoading(false);
      });
  };
  return {err, confirmPasswordReset, loading};
};

export default useConfirmPasswordReset;

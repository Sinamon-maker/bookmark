import auth from '@react-native-firebase/auth';
import {useState} from 'react';

const usePasswordReset = () => {
  const [errEmail, setErrorEmail] = useState('');
  const [errPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);

  const passwordReset = async (email: string) => {
    setLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('User successfuly changed password!');
        setLoading(false);
        setIsEmailSend(true);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log(error.code, error);
          setErrorEmail('user not found');
          setLoading(false);
          return;
        }
        console.log(error.code, error);
        setErrorEmail('Sth wrong');
        setLoading(false);
      });
  };

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
        setErrorPassword('Sth wrong');
        setLoading(false);
      });
  };
  return {
    errEmail,
    errPassword,
    passwordReset,
    confirmPasswordReset,
    loading,
    isEmailSend,
  };
};

export default usePasswordReset;

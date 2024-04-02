/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import userStore from './src/store/userStore';
import {WelcomeScreen} from './src/screen/auth/WelcomeScreen';
import {LoginScreen} from './src/screen/auth/LoginScreen';
import {SignupScreen} from './src/screen/auth/SignupScreen';
import {TasksScreen} from './src/screen/tasks/TasksScreent';
import {CataloguesScreen} from './src/screen/catalogues/CataloguesScreen';
import {FolderScreen} from './src/screen/folders/FolderScreen';
import {CreateTaskScreen} from './src/screen/tasks/CreateTaskScreen';
import {ResetPasswordScreen} from './src/screen/auth/ResetPasswordScreen';
import {SettingsScreen} from './src/screen/settings/SettingsScreen';
import {AuthNavigator} from './src/navigation/stack/AuthStackNavigator';
import {TasksNavigator} from './src/navigation/stack/TaskStackNavigator';
import {MainTabNavigator} from './src/navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {LoaderScreen} from './src/screen/LoaderScreen';
import {LoaderAppScreen} from './src/screen/LoaderAppScreen';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  const setUser = userStore(s => s.setUser);
  const user = userStore(s => s.user);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState !== null) {
        setUser(userState);
      } else {
        setUser(null);
      }
      if (initializing) {
        setTimeout(() => {
          setInitializing(false);
        }, 2000);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing, setUser]);

  if (initializing) {
    return <LoaderAppScreen />;
  }
  return (
    <>
      {!user ? (
        <AuthNavigator />
      ) : (
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;

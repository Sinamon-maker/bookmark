/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import userStore from './src/store/userStore';
import {AuthNavigator} from './src/navigation/stack/AuthStackNavigator';
import {MainTabNavigator} from './src/navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {LoaderAppScreen} from './src/screen/LoaderAppScreen';
import SplashScreen from 'react-native-splash-screen';
import crashlytics from '@react-native-firebase/crashlytics';
import {Logs} from './src/config/constants';
import useCatalogueStore from './src/store/useCatalogueStore';

function App(): React.JSX.Element {
  const setUser = userStore(s => s.setUser);
  const user = userStore(s => s.user);
  const init = useCatalogueStore(s => s.init);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    init();
  }, [init]);
  useEffect(() => {
    crashlytics().log(Logs.APP_MOUNTED);
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

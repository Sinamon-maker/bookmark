/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

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

function App(): React.JSX.Element {
  const isLogged = true;
  return (
    <>
      {isLogged ? (
        <NavigationContainer>
          {isLogged ? <MainTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <AuthNavigator />
      )}
    </>
  );
}

export default App;

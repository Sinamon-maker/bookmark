import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {StaticParamList} from '@react-navigation/native';
import {SettingsScreen} from '../../screen/settings/SettingsScreen';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {ChangeEmailScreen} from '../../screen/settings/ChangeEmailScreen';

const Stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerStyle: {backgroundColor: colors.mainBack},
        headerTitleStyle: {
          color: colors.textMain,
          fontFamily: font.InterRegular,
          ...size.lg,
        },
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
    </Stack.Navigator>
  );
};

//export const SettingsNavigator = createStaticNavigation(SettingsStack);

type SettingsStackParamList = {
  Settings: undefined;
  ChangeEmail: undefined;
};

export type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;

declare global {
  namespace ReactNavigation {
    interface SettingsParamList extends SettingsStackParamList {}
  }
}

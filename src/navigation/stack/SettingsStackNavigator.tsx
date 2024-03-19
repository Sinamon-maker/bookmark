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
    </Stack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator({
  initialRouteName: 'Settings',
  screenOptions: {
    headerBackTitleVisible: false,
  },
  screens: {
    Settings: {
      screen: SettingsScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

//export const SettingsNavigator = createStaticNavigation(SettingsStack);

type SettingsStackParamList = StaticParamList<typeof SettingsStack>;

export type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;

declare global {
  namespace ReactNavigation {
    interface SettingsParamList extends SettingsStackParamList {}
  }
}

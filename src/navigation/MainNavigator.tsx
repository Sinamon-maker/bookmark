import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TasksNavigator} from './stack/TaskStackNavigator';
import {SettingsNavigator} from './stack/SettingsStackNavigator';
import {IconComponent} from '../modules/ui/IconComponent';
import {IconsNames} from '../config/constants';
import {colors} from '../config/colors';

type TabBarIconProps = {
  color: string;
  size?: number;
  iconName: IconsNames;
};

export const Tab = createBottomTabNavigator();
const TabBarIcon = ({color, size, iconName}: TabBarIconProps) => {
  return <IconComponent iconName={iconName} color={color} size={size} />;
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TasksBottom"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerShown: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#f8fafc',
        tabBarStyle: {backgroundColor: colors.mainBack},
      }}>
      <Tab.Screen
        name="TasksBottom"
        component={TasksNavigator}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <TabBarIcon color={color} size={size} iconName={IconsNames.TASKS} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsBottom"
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <IconComponent iconName={IconsNames.ACCOUNT} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

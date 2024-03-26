import React from 'react';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {TasksScreen} from '../../screen/tasks/TasksScreent';
import {CataloguesScreen} from '../../screen/catalogues/CataloguesScreen';
import {FolderScreen} from '../../screen/folders/FolderScreen';

import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {Task} from '../../config/types';
import {CreateTaskScreen} from '../../screen/tasks/CreateTaskScreen';

const Stack = createNativeStackNavigator();

export const TasksNavigator = () => {
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
      <Stack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Catalogues"
        component={CataloguesScreen}
        options={{
          title: 'Catalogues',
        }}
      />
      <Stack.Screen
        name="Folders"
        component={FolderScreen}
        options={{
          title: 'Folders',
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          title: 'Create Task',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

type TasksStackParamList = {
  Tasks: undefined;
  Catalogues: undefined;
  Folders: undefined;
  CreateTask: Task | undefined;
};

export type TasksProps = NativeStackScreenProps<
  TasksStackParamList,
  'CreateTask'
>;
export type TasksScreenNavigationProp = TasksProps['navigation'];
export type TasksScreenRouteProp = TasksProps['route'];

declare global {
  namespace ReactNavigation {
    interface TasksParamList extends TasksStackParamList {}
  }
}

import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {TaskItem} from '../../components/tasks/TaskItem';
import {colors} from '../../config/colors';
import {TaskSorting} from '../../components/tasks/TaskSorting';
import {FilterComponent} from '../../components/tasks/FilterCompnent';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {tasks} from '../../data/data';
import {EmptyComponent} from '../../modules/common/EmptyComponent';
import {Separator} from '../../modules/common/Separator';
import {InputAdd} from '../../modules/common/InputAdd';

const folders = [
  {id: 'kjhdfjknknknhjk', title: 'English', usertId: 'nkjnnjo'},
  {id: 'kjhdfjkhjk', title: 'Deutsch', usertId: 'nkjnnjo'},
  {id: 'kjhdfjknknknhffggjk', title: 'English2', usertId: 'nkjnnjo'},
  {id: 'kjhjxfkhjed3313k', title: 'Deutsch2', usertId: 'nkjnnjo'},
  {id: 'kjhjfxknknknhf08ggjk', title: 'English4', usertId: 'nkjnnjo'},
  {id: 'kjhjxkhje86313k', title: 'Deutsch4', usertId: 'nkjnnjo'},
  {id: 'kjhjkcgnknd3nhjk', title: 'English9', usertId: 'nkjnnjo'},
  {id: 'kjhjkcg4jk', title: 'Deutsch8', usertId: 'nkjnnjo'},
  {id: 'kjhjkndgknknhffggjk', title: 'English28', usertId: 'nkjnnjo'},
  {id: 'kjhjkh767jed3313k', title: 'Deutsch27', usertId: 'nkjnnjo'},
  {id: 'kjhjknk657nknhf08ggjk', title: 'English47', usertId: 'nkjnnjo'},
  {id: 'kjhjkhdfj756e86313k', title: 'Deutsch46', usertId: 'nkjnnjo'},
];

export const TasksScreen = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();

  const navigateToCatalogues = () => {
    navigation.navigate('Catalogues');
  };

  const navigateToFolders = () => {
    navigation.navigate('Folders');
  };

  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <FilterComponent options={folders} onPress={navigateToFolders} />
        <FilterComponent
          options={folders}
          selected="kjhjkcg4jk"
          onPress={navigateToCatalogues}
        />
        <TaskSorting />
        <View style={{flex: 1}}>
          <FlatList
            ListEmptyComponent={<EmptyComponent title="Tasks" />}
            style={{
              borderRadius: 8,
            }}
            data={tasks}
            keyExtractor={item => item.created.toString()}
            renderItem={({item, index}) => (
              <TaskItem task={item} index={index} />
            )}
          />
        </View>

        <InputAdd
          placeholder="Add new task"
          submit={val => console.log(`submit ${val}`)}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    padding: 12,
    backgroundColor: colors.mainBack,
    height: '100%',
  },
});

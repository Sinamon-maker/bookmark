import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {size} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';

export const TaskSorting = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();

  const navigateToCreateTask = () => {
    navigation.navigate('CreateTask');
  };
  return (
    <View style={styles.actionTaskWrap}>
      <AppButton btnStyles={styles.addBtn} onPress={navigateToCreateTask}>
        <IconComponent iconName={IconsNames.ADD} size={24} />
      </AppButton>
      <View style={styles.sortingWrap}>
        <AppButton
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="All"
          onPress={() => console.log('All')}
        />
        <AppButton
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="Ongoing"
          onPress={() => console.log('Ongoing')}
        />
        <AppButton
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="Done"
          onPress={() => console.log('Done')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionTaskWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingRight: 4,
  },
  addBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  sortingWrap: {
    flexDirection: 'row',
    gap: 6,
  },
  sortBtn: {
    backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textSortBtn: {
    ...size.sm,
  },
});

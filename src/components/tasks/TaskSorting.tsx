import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {font, size} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {SortTaskParam} from '../../config/constants';

export type TaskSortingProps = {
  onPressSort: (val: SortTaskParam) => void;
  disableSort?: boolean;
  query: SortTaskParam;
  archived: boolean;
};

export const TaskSorting = ({
  onPressSort,
  query,
  archived = false,
  disableSort = false,
}: TaskSortingProps) => {
  const navigation = useNavigation<TasksScreenNavigationProp>();

  const navigateToCreateTask = () => {
    navigation.navigate('CreateTask');
  };
  return (
    <View style={styles.actionTaskWrap}>
      {!archived && (
        <AppButton btnStyles={styles.addBtn} onPress={navigateToCreateTask}>
          <IconComponent iconName={IconsNames.ADD} size={24} />
        </AppButton>
      )}
      {archived && <Text style={styles.archivedText}>Archived tsks</Text>}
      <View style={styles.sortingWrap}>
        <AppButton
          background={
            query === SortTaskParam.ALL ? colors.mainBack : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="All"
          onPress={() => onPressSort(SortTaskParam.ALL)}
          disabled={disableSort}
        />
        <AppButton
          background={
            query === SortTaskParam.ONGOING ? colors.mainBack : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="Ongoing"
          onPress={() => onPressSort(SortTaskParam.ONGOING)}
          disabled={disableSort}
        />
        <AppButton
          background={
            query === SortTaskParam.DONE ? colors.mainBack : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text="Done"
          onPress={() => onPressSort(SortTaskParam.DONE)}
          disabled={disableSort}
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
  archivedText: {
    ...size.sm,
    fontFamily: font.InterRegular,
    letterSpacing: 0.2,
  },
  sortBtn: {
    // backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textSortBtn: {
    ...size.sm,
  },
});

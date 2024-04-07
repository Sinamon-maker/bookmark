import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {size, font} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {Task} from '../../config/types';
import {MyContextMenu} from '../../modules/common/ContextMenu';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {alertText} from '../../utils';

export type TaskItemProps = {
  task: Task;
  index: number;
  changeStatus: (val: Task) => void;
  deleteTask: (val: Task) => void;
  archived: boolean;
};

export const TaskItem = ({
  task,
  index,
  changeStatus,
  deleteTask,
  archived = false,
}: TaskItemProps) => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const [isUnfold, setIsUnfold] = useState(false);

  const toEditScreen = () => {
    navigation.navigate('CreateTask', task);
  };

  const onPressDelete = () => {
    Alert.alert(alertText.deleteTitle, alertText.deleteTask, [
      {text: 'No'},
      {text: 'Yes', onPress: () => deleteTask(task)},
    ]);
  };

  return (
    <View style={styles.itemWrap}>
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{index + 1}</Text>
        {task.status ? (
          <AppButton
            btnStyles={styles.checkedBtn}
            onPress={() => changeStatus(task)}
            disabled={archived}>
            <IconComponent iconName={IconsNames.CHECK} size={18} />
          </AppButton>
        ) : (
          <AppButton
            btnStyles={styles.uncheckedBtn}
            onPress={() => changeStatus(task)}
            disabled={archived}
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <View style={styles.headingWrap}>
          <Text
            style={[
              styles.title,
              {textDecorationLine: task.status ? 'line-through' : 'none'},
            ]}>
            {task.text}
          </Text>

          {task.detailes && (
            <AppButton
              btnStyles={styles.unfoldBtn}
              onPress={() => setIsUnfold(!isUnfold)}>
              <IconComponent iconName={IconsNames.UNFOLD} size={18} />
            </AppButton>
          )}
          {!isUnfold && !archived && (
            <View style={styles.moreBtn}>
              <MyContextMenu
                contextMenuData={[
                  {title: 'edit', func: () => toEditScreen()},
                  {title: 'delete', func: () => onPressDelete()},
                ]}
              />
            </View>
          )}
        </View>
        {isUnfold && <Text style={styles.description}>{task.detailes}</Text>}
        {isUnfold && !archived && (
          <View style={styles.footerWrap}>
            <AppButton
              text="edit"
              btnStyles={styles.footerEditBtn}
              textStyles={styles.footerTextEditBtn}
              onPress={toEditScreen}
            />
            <AppButton
              text="delete"
              btnStyles={styles.footerDelBtn}
              textStyles={{...size.sm}}
              onPress={onPressDelete}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: colors.mainBack,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    padding: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  numberWrap: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  number: {
    fontFamily: font.InterBold,
    ...size.base,
    color: colors.textMain,
  },
  title: {
    fontFamily: font.InterSemiBold,
    ...size.base,
    color: colors.textMain,
    flex: 1,
  },
  checkedBtn: {
    backgroundColor: colors.additional,
    height: 24,
    width: 24,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedBtn: {
    borderColor: colors.secondary,
    backgroundColor: 'transparent',
    height: 24,
    width: 24,
    borderRadius: 50,
  },
  unfoldBtn: {
    height: 24,
    width: 24,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    backgroundColor: 'transparent',
  },
  moreBtn: {
    height: 24,
    width: 24,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    backgroundColor: 'transparent',
  },
  headingWrap: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 6,
  },
  description: {
    fontFamily: font.InterRegular,
    ...size.sm,
    color: colors.textMain,
  },
  footerWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: 6,
  },
  footerEditBtn: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 2,
    marginRight: 6,
    backgroundColor: colors.light,
  },
  footerDelBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 2,
  },
  footerTextEditBtn: {
    color: colors.textInput,
    ...size.sm,
  },
});

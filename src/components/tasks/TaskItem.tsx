import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {size, font} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import {Task} from '../../config/types';
import {MyContextMenu} from '../../modules/common/ContextMenu';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';

export type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({task}: TaskItemProps) => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const [isUnfold, setIsUnfold] = useState(false);

  const toEditScreen = () => {
    navigation.navigate('CreateTask', task);
  };
  return (
    <View style={styles.itemWrap}>
      <View style={styles.numberWrap}>
        <Text style={styles.number}>1</Text>
        {true ? (
          <AppButton
            btnStyles={styles.checkedBtn}
            onPress={() => console.log('checked')}>
            <IconComponent iconName={IconsNames.CHECK} size={18} />
          </AppButton>
        ) : (
          <AppButton
            btnStyles={styles.uncheckedBtn}
            onPress={() => console.log('unchecked')}
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <View style={styles.headingWrap}>
          <Text style={styles.title}>heading</Text>

          <AppButton
            btnStyles={styles.unfoldBtn}
            onPress={() => setIsUnfold(!isUnfold)}>
            <IconComponent iconName={IconsNames.UNFOLD} size={18} />
          </AppButton>
          {!isUnfold && (
            <View style={styles.moreBtn}>
              <MyContextMenu
                contextMenuData={[
                  {title: 'edit', func: () => toEditScreen()},
                  {title: 'delete', func: () => console.warn('delete task')},
                ]}
              />
            </View>
          )}
        </View>
        {isUnfold && (
          <Text style={styles.description}>
            description very long description and so on description very long
            description and so on
          </Text>
        )}
        {isUnfold && (
          <View style={styles.footerWrap}>
            <AppButton
              text="edit"
              btnStyles={styles.footerEditBtn}
              textStyles={styles.footerTextEditBtn}
            />
            <AppButton
              text="delete"
              btnStyles={styles.footerDelBtn}
              textStyles={{...size.sm}}
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

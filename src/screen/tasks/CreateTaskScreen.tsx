import React, {useState} from 'react';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {View, Text, StyleSheet} from 'react-native';
import {AppForm} from '../../form/AppForm';
import {InputFieldForm} from '../../form/InputFieldForm';
import {SubmitFieldForm} from '../../form/SubmitFieldForm';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import {AppButton} from '../../modules/ui/AppButton';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {tasksEditSchema} from '../../form/schemas/taskEditSchema';
import {TasksScreenNavigationProp} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Task} from '../../config/types';

type TaskEditValues = {
  taskText: string;
  detailes?: string;
};

export type CreateTaskScreenProps = {
  navigation: TasksScreenNavigationProp;
  route: {
    params?: Task;
  };
};

export const CreateTaskScreen = ({
  route,
  navigation,
}: CreateTaskScreenProps) => {
  const task = route.params;
  const [valu, setVal] = useState();
  const submit = (val: TaskEditValues) => {
    console.log(val);
    setVal(val?.detailes);
  };

  const navigateBackToTasks = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <Text style={styles.textHeading}>
          {task ? 'Edit task' : 'Create task'}
        </Text>
        <Text>{valu}</Text>
        <AppForm<TaskEditValues>
          initialValues={
            !task
              ? {
                  taskText: '',
                  detailes: '',
                }
              : {
                  taskText: task.text,
                  detailes: task.detailes,
                }
          }
          onSubmit={values => submit(values)}
          validationSchema={tasksEditSchema}
          validateOnMount={false}
          enableReinitialize>
          <InputFieldForm
            placeholder="task"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            textContentType="name"
            name="taskText"
          />

          <InputFieldForm
            placeholder="Detailes"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            multiline
            name="detailes"
            onSubmitEditing={() => console.log('submit editing')}
          />

          <ErrorComponent message="error" />
          <SubmitFieldForm title="Save" />
          <AppButton
            background={colors.secondary}
            btnStyles={{marginTop: 16}}
            text="Cancel"
            onPress={navigateBackToTasks}
          />
        </AppForm>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    backgroundColor: colors.superLight,
    padding: 8,
    height: '100%',
    width: '100%',
  },
  textHeading: {
    fontFamily: font.InterBold,
    ...size.h1lg,
    marginVertical: 10,
    color: colors.secondary,
  },
});

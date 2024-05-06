import React from 'react';
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
import {
  TasksScreenNavigationProp,
  TasksScreenRouteProp,
} from '../../navigation/stack/TaskStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Data, Task} from '../../config/types';
import useCatalogueStore from '../../store/useCatalogueStore';
import {useUpdateData} from '../../api/useUpdateData';
import {useGetDocument} from '../../api/useGetDocument';
import {CollectionNames} from '../../config/constants';

type TaskEditValues = {
  taskText: string;
  detailes?: string;
};

export type CreateTaskScreenProps = {
  navigation: TasksScreenNavigationProp;
  route?: {
    params: Task;
  };
};

export const CreateTaskScreen = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const route = useRoute<TasksScreenRouteProp>();
  const task = route ? route.params : undefined;
  const activeCatalogue = useCatalogueStore(s => s.activeCatalogue);
  const {loading, err, updateData} = useUpdateData();
  const {data} = useGetDocument<Data>(
    CollectionNames.Catalogues,
    activeCatalogue,
  );
  const taskList = data ? data.tasks : [];
  const createTask = (val: TaskEditValues) => {
    const item = {
      text: val.taskText,
      detailes: val.detailes,
      status: false,
      created: +new Date(),
    };
    const newTasks = [...taskList, {...item}];
    updateData(CollectionNames.Catalogues, {tasks: newTasks}, activeCatalogue);
  };

  const changeTask = (val: TaskEditValues) => {
    const item = {
      ...task,
      text: val.taskText,
      detailes: val.detailes,
    };
    const newTasks = taskList?.map(it => {
      if (item.created === it.created) {
        return {...item};
      } else {
        return it;
      }
    });
    updateData(CollectionNames.Catalogues, {tasks: newTasks}, activeCatalogue);
  };
  const submit = (val: TaskEditValues) => {
    if (!task) {
      createTask(val);
    } else {
      changeTask(val);
    }
    navigateBackToTasks();
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
          />

          <ErrorComponent message={err} />
          <SubmitFieldForm title="Save" loading={loading} />
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

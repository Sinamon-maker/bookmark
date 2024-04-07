import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {tasks} from '../../data/data';
import {EmptyComponent} from '../../modules/common/EmptyComponent';
import {emptyText} from '../../utils';
import {TaskItem} from './TaskItem';
import {TaskSorting} from './TaskSorting';
import {useGetDocument} from '../../api/useGetDocument';
import {CollectionNames} from '../../config/constants';
import {Data, Task} from '../../config/types';
import {SortTaskParam} from '../../config/constants';
import {InputAdd} from '../../modules/common/InputAdd';
import {useUpdateData} from '../../api/useUpdateData';

export type TaskContentProps = {
  activeCatalogue: string;
};

export const TaskContent = ({activeCatalogue}: TaskContentProps) => {
  const [query, setQuery] = useState<SortTaskParam>(SortTaskParam.ALL);
  const {loading, err, updateData} = useUpdateData();
  const {data} = useGetDocument<Data>(
    CollectionNames.Catalogues,
    activeCatalogue,
  );
  const taskList = data ? data.tasks : [];

  const createSimpleTask = (val: string) => {
    const item = {
      created: +new Date(),
      text: val,
      status: false,
      detailes: '',
    };

    const newTasks = [...taskList, {...item}];
    updateData(CollectionNames.Catalogues, {tasks: newTasks}, activeCatalogue);
  };

  const onChangeStatus = (item: Task) => {
    const newTasks = taskList?.map(it => {
      if (item.created === it.created) {
        return {...it, status: !it.status};
      } else {
        return it;
      }
    });

    updateData(CollectionNames.Catalogues, {tasks: newTasks}, activeCatalogue);
  };
  const deleteTask = (item: Task) => {
    const newTasks = taskList?.filter(it => it.created !== item.created);
    updateData(CollectionNames.Catalogues, {tasks: newTasks}, activeCatalogue);
  };

  const sortedList =
    query === SortTaskParam.ALL
      ? taskList
      : query === SortTaskParam.ONGOING
      ? taskList.filter(task => !task.status)
      : taskList.filter(task => task.status);

  return (
    <>
      <TaskSorting
        disableSort={taskList.length === 0}
        onPressSort={setQuery}
        query={query}
        archived={data ? data.archived : false}
      />
      <View style={{flex: 1}}>
        <FlatList
          ListEmptyComponent={
            <EmptyComponent
              title={
                taskList.length === 0
                  ? emptyText.noTasksWithinCatalogue
                  : emptyText.noTasks
              }
            />
          }
          style={{
            borderRadius: 8,
            paddingRight: 6,
          }}
          data={sortedList}
          keyExtractor={item => item.created.toString()}
          renderItem={({item, index}) => (
            <TaskItem
              task={item}
              index={index}
              changeStatus={onChangeStatus}
              deleteTask={deleteTask}
              archived={data ? data.archived : false}
            />
          )}
        />
      </View>
      {!data?.archived && (
        <InputAdd
          placeholder="Add new task"
          submit={val => createSimpleTask(val)}
        />
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);
    if (taskWithSameTitle) {
      
      return Alert.alert('Tarefa já existe', 'Não é possível adicionar tarefas com o mesmo nome');
    }
    
    const newTask ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTasks => [...oldTasks, newTask]);

    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task}))
    const foundItem = updatedTasks.find(item => item.id === id); //TODO - find task with id
    if (!foundItem)
     return
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Item','Tem certeza que você deseja remover?',[
    {
      style: 'cancel',
      text: 'Não',
    },
    {
      style: 'destructive',
      text: 'Sim',
      onPress: () => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
      }
    }])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task}))
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId); 
    if (!taskToBeUpdated)
     return
     taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);
    //TODO - edit task if exists
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  }
})
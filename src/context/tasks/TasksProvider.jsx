import { TasksContext } from "./TasksContext";
import { useEffect, useState } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../../api/tasks";

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      if (!res.data) {
        return setTasks([]);
      }
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getTasks();
  // }, []);

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      const res = await updateTaskRequest(id, newTask);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (_id) => {
    try {
      const res = await deleteTaskRequest(_id);
      if (res.data) {
        const newTasks = tasks.filter((task) => task._id !== _id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        getTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;

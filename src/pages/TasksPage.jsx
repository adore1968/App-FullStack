import { useTasks } from "../context/tasks/TasksContext";
import Loading from "../components/Loading";
import TaskCard from "../components/TaskCard";
import { useEffect } from "react";

function TasksPage() {
  const { getTasks, isLoading, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) return <Loading />;

  if (tasks.length === 0) {
    return (
      <div className="text-center pt-12 text-xl sm:text-2xl">
        <h1>No tasks</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto pt-12 gap-5">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;

import { Link } from "react-router-dom";
import { useTasks } from "../context/tasks/TasksContext";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-gray-700 p-5 flex flex-col gap-5">
      <h3 className="text-xl sm:text-2xl">{task.title}</h3>
      <div className="flex justify-between items-center text-lg sm:text-xl">
        <Link
          to={`/tasks/${task._id}`}
          className="bg-green-500 hover:bg-green-600 transition-colors py-1 px-4 rounded"
        >
          Update
        </Link>
        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 hover:bg-red-600 transition-colors py-1 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <p className="text-lg sm:text-xl">{task.description}</p>
      <p>
        {task.date &&
          new Date(task.date).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </div>
  );
}

export default TaskCard;

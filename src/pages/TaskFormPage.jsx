import { useForm } from "react-hook-form";
import { useTasks } from "../context/tasks/TasksContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { getTask, createTask, updateTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((task) => {
          setValue("title", task.title);
          setValue("description", task.description);
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
          );
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const onSubmit = handleSubmit((values) => {
    if (!id) createTask({ ...values, date: dayjs.utc(values.date).format() });
    else updateTask(id, { ...values, date: dayjs.utc(values.date).format() });
    navigate("/tasks");
  });

  const setButtonColors = () => {
    if (id) return "bg-green-500 hover:bg-green-600";
    return "bg-blue-500 hover:bg-blue-600";
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 bg-gray-700 p-5 max-w-xl flex-auto"
      >
        <label htmlFor="title" className="text-xl sm:text-2xl">
          Title
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="w-full text-lg sm:text-xl text-black p-2 rounded mt-1"
          />
        </label>
        {errors.title && (
          <p className="text-lg sm:text-xl text-red-500">Title is required</p>
        )}

        <label htmlFor="description" className="text-xl sm:text-2xl">
          Description
          <textarea
            id="description"
            rows="3"
            {...register("description", { required: true })}
            className="text-black w-full mt-1 text-lg sm:text-xl p-2 rounded"
          ></textarea>
        </label>
        {errors.description && (
          <p className="text-lg sm:text-xl text-red-500">
            Description is required
          </p>
        )}
        <label className="text-xl sm:text-2xl" htmlFor="date">
          Date
          <input
            type="date"
            id="date"
            className="w-full p-2 text-lg sm:text-xl mt-1 text-black rounded"
            {...register("date", { required: true })}
          />
        </label>
        {errors.date && (
          <p className="text-lg sm:text-xl text-red-500">Date is required</p>
        )}
        <button
          type="submit"
          className={`p-2 text-xl sm:text-xl ${setButtonColors()} w-2/4 mx-auto rounded transition-colors`}
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;

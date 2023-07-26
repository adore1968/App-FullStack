import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();

  const onSubmit = handleSubmit((values) => {
    registerUser(values);
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-700 p-5 flex flex-col gap-5 max-w-xl flex-auto">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label htmlFor="username" className="text-xl sm:text-2xl">
            Username
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="w-full mt-1 text-lg sm:text-xl p-2 text-black rounded"
            />
          </label>
          {errors.username && (
            <p className="text-lg sm:text-xl text-red-500">
              Username is required
            </p>
          )}

          <label htmlFor="email" className="text-xl sm:text-2xl">
            Email
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full mt-1 p-2 text-black text-lg sm:text-xl rounded"
            />
          </label>
          {errors.email && (
            <p className="text-lg sm:text-xl text-red-500">Email is required</p>
          )}

          <label htmlFor="password" className="text-xl sm:text-2xl">
            Password
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-1 p-2 text-black text-lg sm:text-xl rounded"
            />
          </label>
          {errors.password && (
            <p className="text-lg sm:text-xl text-red-500">
              Password is required
            </p>
          )}
          <button className="bg-green-500 p-2 text-lg sm:text-xl w-2/4 mx-auto rounded hover:bg-green-600 transition-colors">
            Register
          </button>
        </form>
        <div className="flex justify-between items-center">
          <p className="text-lg sm:text-xl">Already have an account?</p>
          <Link
            to="/login"
            className="bg-blue-500 py-1 px-4 text-lg sm:text-xl rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();

  const onSubmit = handleSubmit((values) => {
    loginUser(values);
  });

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="bg-gray-700 p-5 flex-auto max-w-xl flex flex-col gap-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label htmlFor="email" className="text-xl sm:text-2xl">
            Email
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full p-2 text-lg sm:text-xl mt-1 text-black rounded"
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
              className="w-full p-2 mt-1 text-lg sm:text-xl text-black rounded"
            />
          </label>
          {errors.password && (
            <p className="text-lg sm:text-xl text-red-500">
              Password is required
            </p>
          )}
          <button className="bg-green-500 hover:bg-green-600 transition-colors text-lg sm:text-xl p-2 w-2/4 mx-auto rounded">
            Login
          </button>
        </form>
        <div className="flex text-lg sm:text-xl justify-between items-center">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 py-1 px-4  transition-colors rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

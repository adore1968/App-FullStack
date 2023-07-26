import { useAuth } from "../context/auth/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuth, user, logoutUser } = useAuth();
  return (
    <nav className="bg-gray-700 flex justify-between p-8 items-center">
      <Link to="/">
        <h1 className="text-xl sm:text-2xl">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-5 items-center">
        {isAuth ? (
          <>
            <li className="text-lg sm:text-xl">
              <p>Welcome {user.username}</p>
            </li>
            <li className="text-lg sm:text-xl bg-blue-500 px-4 py-1 hover:bg-blue-600 transition-colors">
              <Link to="/add-task">Add Task</Link>
            </li>
            <li className="text-lg sm:text-xl bg-blue-500 px-4 py-1 hover:bg-blue-600 transition-colors">
              <button onClick={() => logoutUser()}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="text-lg sm:text-xl bg-blue-500 px-4 py-1 hover:bg-blue-600 transition-colors">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-lg sm:text-xl bg-blue-500 px-4 py-1 hover:bg-blue-600 transition-colors">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

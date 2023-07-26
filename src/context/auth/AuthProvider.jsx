import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import {
  registerUserRequest,
  loginUserRequest,
  logoutUserRequest,
  verifyRequest,
} from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const registerUser = async (user) => {
    try {
      const res = await registerUserRequest(user);
      if (!res.data) {
        setUser(null);
        return setIsAuth(false);
      }
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuth(false);
    }
  };

  const loginUser = async (user) => {
    try {
      const res = await loginUserRequest(user);
      if (!res.data) {
        setUser(null);
        return setIsAuth(false);
      }
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await logoutUserRequest();
      if (res.status === 204) {
        setUser(null);
        setIsAuth(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setUser(null);
          setIsAuth(false);
          return setIsLoading(false)
        }
        const res = await verifyRequest();
        if (!res.data) {
          setUser(null);
          setIsAuth(false);
          return setIsLoading(false);
        }
        setUser(res.data);
        setIsAuth(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsAuth(false);
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isAuth) navigate("/tasks");
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, isLoading, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); // reset at every attempt

    // try {
    //   const response = await fetch("/api/user/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const json = await response.json();

    //   if (!response.ok) {
    //     setIsLoading(false);
    //     setError(json.error);
    //   }
    //   if (response.ok) {
    //     // save user to local storage
    //     localStorage.setItem("user", JSON.stringify(json));
    //     const token = json.token;
    //     setAuth({ email, password, token });
    //     console.log(auth.token);
    //     console.log(token);
    //     // update authcontext
    //     setIsLoading(false);
    //     navigate(from, {replace: true});
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "/api/user/login",
        JSON.stringify({ email, password }),
        config
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      const token = response.data.token;
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response.data.error);
      console.log(err?.response.data.error);
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};

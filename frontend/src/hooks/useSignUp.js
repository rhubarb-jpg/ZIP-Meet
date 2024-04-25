import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [pics, setPics] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signup = async (
    name,
    email,
    password,
    confirmPassword,
    pics,
    zipcode,
    dob,
    gender,
    interest,
    userInterests
  ) => {
    setIsLoading(true);
    setError(null); // reset at every attempt

    if (name === "") {
      setIsLoading(false);
      setError("Please enter a name");
      return;
    }
    if (email === "") {
      setIsLoading(false);
      setError("Please enter an email");
      return;
    }
    if (password == "" || confirmPassword == "") {
      setIsLoading(false);
      setError("Please fill password fields");
      return;
    }
    if (password !== confirmPassword) {
      setIsLoading(false);
      setError("Passwords do not match");
      return;
    }
    if (zipcode == "") {
      setIsLoading(false);
      setError("Please enter a zipcode");
      return;
    }
    if (dob == "") {
      setIsLoading(false);
      setError(
        "Please enter a date of birth. This will not be shared with other users."
      );
      return;
    }
    if (gender === "") {
      setIsLoading(false);
      setError(
        "Please choose a gender. You can change this later if you like."
      );
      return;
    }
    if (interest === "") {
      setIsLoading(false);
      setError(
        "Please choose an interest. You can change this later if you like."
      );
      return;
    }
    if (pics.length <= 0 || pics.length > 5) {
      setIsLoading(false);
      setError("Please upload no more than 5 pictures");
      setPics([]);
      return;
    }
    if (userInterests.length <= 0) {
      setIsLoading(false);
      setError("Please choose at least one hobby.");
      return;
    }
    if (userInterests.length > 3) {
      setIsLoading(false);
      setError("Please choose only three hobbies.");
      return;
    }
    var hobbies = [];
    userInterests.forEach((interest) => {
      hobbies.push(interest.value);
    });

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        "/api/user/signup",
        JSON.stringify({
          username: name,
          email,
          password,
          pics,
          zipcode,
          dob,
          gender,
          interest,
          hobbies,
        }),
        config
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      const token = response.data.token;
      console.log(token);
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response.data.error);
      setIsLoading(false);
      console.log(err?.response.data.error);
    }
  };
  return { signup, isLoading, error, pics, setPics };
};

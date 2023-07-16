import { useState, useCallback } from "react";
import axiosInstance from '../../axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = (e) => {
    e.preventDefault();

    const requestBody = {
      username,
      password,
    };

    axiosInstance()
      .post("/login", requestBody)
      .then((res) => {
        const token = res.data.token;
        const name = res.data.user.name;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        toast.success(res.data.message, {
          duration: 2000,
          position: 'top-center',
        })

        setTimeout(() => {
          setUsername("");
          setPassword("");
          navigate("/");
        }, 1000);

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={addUser} className="login-form">
          <h1>LOGIN</h1>
        <div>
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <button type="submit">Login</button>

        <p>Dont have an account? <a href="/register">Register</a></p>
      </form>

      <Toaster />
    </>
  );
};

export default Login;

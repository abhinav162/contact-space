import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { Toaster, toast } from 'react-hot-toast';
import "./Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      username,
      password,
    };

    axiosInstance()
      .post("/register", requestBody)
      .then((res) => {
        setName("");
        setUsername("");
        setPassword("");

        toast.success(res.data.message, {
          duration: 2000,
          position: 'top-center',
        })
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          duration: 2000,
          position: 'top-center',
        });
      });
  };

  return (
    <>
      <form onSubmit={addUser} className="register-form">
        <h1 className="register-heading">REGISTER</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Create Username"
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
            placeholder="Create Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <Toaster />
    </>
  );
};

export default Register;

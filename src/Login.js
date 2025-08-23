import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import './Login.css';

function Login({ show, onClose, onLogin }) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Back_End_URL=process.env.REACT_APP_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
        alert("Please fill in both Username and Password.");
        return;
      }
    try {
    console.log("Sending login data:", { username, password });
      const res = await axios.post(`${Back_End_URL}/login`, {
        username,
        password
      });
      console.log("Login success:", res.data);
      navigate("/add-profile");
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err);

    }
  };

  const handleCancel = () => {
        navigate("/");
      };

  return (



    <div className="backdrop">
      <div className="modal">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <div className="formatnew">
          <button type="submit" className="button">
            Login
          </button>
          <button type="button" onClick={handleCancel} className="button">
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>


  );
}

export default Login;


import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <span className="user">{user.name} </span>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "please wait..." : "Login"}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong
        </span>
      </form>
    </div>
  );
};

export default Login;

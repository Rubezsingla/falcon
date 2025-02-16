import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // API base URL (backend server)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

const handleRegister = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    navigate("/"); // Redirect to home after successful registration
  } catch (err) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: err.response?.data || { message: "Something went wrong" },
    });
  }
};



  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "Invalid credentials" } });
    }
  };

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  useEffect(() => {
    if (isLogin) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  }, [isLogin, navigate]);

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Register
          </button>
        </div>
        {isLogin ? (
          <>
            <div className="form">
              <h2>Login Form</h2>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              <button disabled={loading} onClick={handleLogin} className="lButton">
                Login
              </button>
              {error && <div className="error-message">{error.message}</div>}
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="rInput"
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="rInput"
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="rInput"
              />
              <button disabled={loading} onClick={handleRegister} className="rButton">
                Register
              </button>
              {error && <div className="error-message">{error.message}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const location= useLocation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClickR = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/"); // Redirect to home after successful registration
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  useEffect(() => {
    if (isLogin) {
      navigate("/login");  // Update URL to /login
    } else {
      navigate("/register");  // Update URL to /register
    }
  }, [isLogin, navigate]);

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? (
          <>
            <div className="form">
              <h2>Login Form</h2>
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              <a href="#">Forgot Password?</a>
              <button
                disabled={loading}
                onClick={handleClick}
                className="lButton"
              >
                Login
              </button>
              <p>
                Not a Member?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  Register now
                </a>
              </p>
            </div>
            {error && <div className="error-message">{error.message}</div>}

          </>
        ) : (
          <>
            <div className="form">
              <h2>Register </h2>
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="rInput"
              />
              <input
              type="email"
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="rInput"
              />
              <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="rInput"
              />
              <button disabled={loading} onClick={handleClickR} className="rButton">
                Register
              </button>
              <p>
                Have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  Login now
                </a>
              </p>
            </div>
            {error && <div className="error-message">{error.message}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

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

  // API base URL and Google Client ID
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";
  const GOOGLE_CLIENT_ID = "1038404365456-728tu6ukd3akdmbvdp32o2vl4rf5epe2.apps.googleusercontent.com";

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API_URL}/register`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/welcomePage");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "Something went wrong" } });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/welcomePage");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "Invalid credentials" } });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    try {
      const decoded = jwtDecode(tokenId);
      console.log("Decoded Google Token:", decoded);

      dispatch({ type: "LOGIN_START" });
      const res = await axios.post(`${API_URL}/google-login`, { tokenId });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/welcomePage");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "Google login failed" } });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign In was unsuccessful. Try again later.", error);
  };

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  useEffect(() => {
    navigate(isLogin ? "/login" : "/register");
  }, [isLogin, navigate]);

  return (
    <GoogleOAuthProvider clientId="1038404365456-728tu6ukd3akdmbvdp32o2vl4rf5epe2.apps.googleusercontent.com">
      <div className="container">
        <div className="overlay"></div>

        {/* Text Container */}
        <div className="text-container">
          <p>Flex It Out</p>
          <p>Are You Ready?</p>
          <p>It's Time to Make</p>
          <p>You Fit</p>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <div className="form-toggle">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="lInput"
              />
            )}
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <button disabled={loading} onClick={isLogin ? handleLogin : handleRegister} className="lButton">
              {isLogin ? "Login" : "Register"}
            </button>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            {error && <div className="error-message">{error.message}</div>}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

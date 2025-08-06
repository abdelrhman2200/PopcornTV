import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import spinner from "../../assets/spinner.gif";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../firebase";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();

    if (!email || !password || (signState === "Sign Up" && !name.trim())) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
        toast.success("Logged in successfully");
      } else {
        await signup(name, email, password);
        toast.success("Account created successfully");
      }
      navigate("/");
    } catch (error) {
      
      const message = error.code
        ? error.code.split("/")[1].replace(/-/g, " ")
        : error.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="loading-spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="PopcornTV Logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit" className="gradient-button">
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <label className="remember unselectable">
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to PopcornTV?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

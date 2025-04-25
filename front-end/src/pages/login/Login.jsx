import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import Logo from "./../../assets/logo.png";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate(); // Using useNavigate hook to get navigation function

  const handleLogin = async () => {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    try {
      const response = await axios.get(
        `http://localhost:8080/verify/${userName}/${password}`
      );
      if (response.data) {
        navigate(`/home/${userName}`); // Navigating to home page using navigate function
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Empower Your Skills</h1>
          <p>
            Welcome to SkillSphere — your gateway to learning, growth, and endless possibilities. Start your journey today.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Join Now</button>
          </Link>
        </div>
        <div className="right">
          <div className="logo">
           
            <span>SkillSphere</span>
          </div>
          <h1>Sign In</h1>
          <form>
            <input id="userName" type="text" placeholder="Username" required/>
            <input id="password" type="password" placeholder="Password" required/>
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

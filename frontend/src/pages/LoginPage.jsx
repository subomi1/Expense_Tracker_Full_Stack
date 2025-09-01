import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { email, password } = data;
    const loginSuccess = await login(email, password);
    if (loginSuccess) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
      <div className="w-full">
        <Navbar name="Login" />
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your email" name="email" />
          <input
            type="text"
            placeholder="Enter your password"
            name="password"
          />
          <button>Login</button>
        </form>
      </div>
  );
}

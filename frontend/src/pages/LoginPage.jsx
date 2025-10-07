import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login, loginLoading } = useContext(AuthContext);
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
      <div className="w-full flex justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[600px] py-10"
        >
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Email or Username
          </label>
          <input
            type="text"
            placeholder="Enter your Email or Username"
            name="email"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          <div className="w-full flex justify-center">
            <button className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent" disabled={loginLoading}>
              {loginLoading ? "Logging In": "Login"}
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link to="/register" className="mt-5 underline text-[#008080] hover:text-[#01c5c5fd]">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

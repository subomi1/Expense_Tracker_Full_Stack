import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      <div className="w-full flex justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[600px] py-10"
        >
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Email or Username
          </label>
          <input
            type="text"
            placeholder="Enter your Email or Username"
            name="email"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="password"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5"
          />
          <div className="w-full flex justify-center">
            <button className="cursor-pointer bg-amber-950 px-5 py-2 text-[#CDAF94] rounded-md font-semibold">
              Login
            </button>
          </div>
          <div className="w-full flex justify-center">
            <Link to="/register" className="mt-5 underline text-[#CDAF94]">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

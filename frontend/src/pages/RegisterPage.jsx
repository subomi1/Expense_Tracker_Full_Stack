import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../http";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../store/AuthContext";
import { queryClient } from "../http";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: mutateRegisterAccount } = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        alert(`${username} logged in successfully`)
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutateRegisterAccount({
      email: email,
      username: username,
      password: password,
    });
  }
  return (
    <div className="w-full">
      <Navbar name="Register" />
      <div className="w-full flex justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[600px] py-10"
        >
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#3D352E]">
            Confirm Password
          </label>
          <input
            type="text"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="password"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
          />
          {confirmPassword == password ? (
            ""
          ) : (
            <p className="text-xs underline mt-2 text-red-600 self-start">
              Passwords do not match
            </p>
          )}
          <div className="w-full flex justify-center">
            <button className="cursor-pointer bg-amber-950 px-5 py-2 text-[#CDAF94] rounded-md font-semibold hover:border-[1px] hover:border-[#CDAF94] hover:bg-transparent transition-all duration-300 hover:text-amber-950 mt-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

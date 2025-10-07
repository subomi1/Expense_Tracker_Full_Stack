import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../http";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../store/AuthContext";
import { queryClient } from "../http";

export default function Register() {
  const { login, logoutLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: mutateRegisterAccount, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        alert(`${username} logged in successfully`);
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
          className="flex flex-col w-full max-w-[600px] py-10 md:px-2 px-4 md:py-5"
        >
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your Email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          <label htmlFor="" className="mb-3 font-bold text-[#008080]">
            Confirm Password
          </label>
          <input
            type="text"
            placeholder="Confirm your password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="password"
            className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0 mb-5 text-[#000606] bg-white"
          />
          {confirmPassword == password ? (
            ""
          ) : (
            <p className="text-xs underline mt-2 text-red-600 self-start">
              Passwords do not match
            </p>
          )}
          <div className="w-full flex justify-center">
            <button
              className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent mt-7"
              disabled={isPending}
            >
              {isPending ? "Registering" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

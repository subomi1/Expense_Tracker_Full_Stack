import expense from "../assets/expense icon.png";
import {
  LayoutDashboardIcon,
  HandCoins,
  Shapes,
  LogIn,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../http";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { user, email, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      navigate('/dashboard')
    }
  })
  function handleLogout() {
    mutate();
  }
  let linkClass =
    "flex gap-1 items-center text-[#CDAF94] font-bold mb-4 py-2 px-2";
  let activeClass =
    "flex gap-1 items-center text-[#CDAF94] font-bold mb-4 border-b-2 border-[#7A4433] rounded-b-md py-2 px-2";
  let firstLetter = "";
  if (user) {
    firstLetter = user[0]
  }
  return (
    <aside className="w-[250px] bg-[#3D352E] min-h-screen shadow-2xl py-10 flex flex-col border-r-1 border-r-[#8F8C8A]  max-md:hidden justify-between">
      <div className="flex flex-col items-center">
        <img src={expense} alt="Expense Icon" className="w-20 " />
        <h1 className=" mb-10 font-bold text-xl text-[#CDAF94]">Expense Tracker</h1>
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/dashboard"
          >
            <LayoutDashboardIcon className="" />
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/expenses"
          >
            <HandCoins />
            Expenses
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/categories"
          >
            <Shapes />
            Categories
          </NavLink>
        </nav>
      </div>
      <div className="flex flex-col items-center">
        {user ? (
          <button className={`${linkClass} cursor-pointer`} onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/login"
          >
            <LogIn />
            Login
          </NavLink>
        )}
        {user ? (        <div className="flex items-center w-full justify-center gap-3 flex-wrap flex-col">
          <div className="w-[50px] h-[50px] bg-[#6366f1] rounded-full flex justify-center items-center text-4xl">
            <span className="mt-[-9px] text-white">{firstLetter}</span>
          </div>
          <div className="text-center flex flex-col">
            <p>{user}</p>
            <p>{email}</p>
          </div>
        </div>) : null}
      </div>
    </aside>
  );
};

export default Sidebar;

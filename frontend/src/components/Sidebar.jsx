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
const Sidebar = () => {
  const { user, email, logout } = useContext(AuthContext);
  let linkClass =
    "flex gap-1 items-center text-[#71717a] font-bold mb-4 py-2 px-2";
  let activeClass =
    "flex gap-1 items-center text-[#71717a] font-bold mb-4 border-b-2 border-[#6366f1] rounded-b-md py-2 px-2";
  let firstLetter = "";
  if (user) {
    firstLetter = user[0]
  }
  return (
    <aside className="w-[250px] bg-white h-screen rounded-tr-2xl shadow-2xl py-10 flex flex-col border-r-1 border-r-black  max-md:hidden justify-between">
      <div className="flex flex-col items-center">
        <img src={expense} alt="Expense Icon" className="w-20 " />
        <h1 className=" mb-10 font-bold text-xl">Expense Tracker</h1>
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
          <button className={`${linkClass} cursor-pointer`} onClick={logout}>
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
        {user ? (        <div className="flex items-center w-full justify-center gap-3">
          <div className="w-[50px] h-[50px] bg-[#6366f1] rounded-full flex justify-center items-center text-4xl">
            <span className="mt-[-9px] text-white">{firstLetter}</span>
          </div>
          <div>
            <p>{user}</p>
            <p>{email}</p>
          </div>
        </div>) : null}
      </div>
    </aside>
  );
};

export default Sidebar;

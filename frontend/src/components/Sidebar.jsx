import expense from "../assets/expense icon.png";
import expenseIcon from "../assets/icon.png";
import {
  LayoutDashboardIcon,
  HandCoins,
  Shapes,
  LogIn,
  LogOut,
  Wallet,
  Radar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../http";
import { useNavigate } from "react-router-dom";
import PageContext from "../store/PageContext";
const Sidebar = () => {
  const { user, email, logout } = useContext(AuthContext);
  const { incomePage, expensePage } = useContext(PageContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      navigate("/login");
    },
  });
  function handleLogout() {
    mutate();
  }
  let linkClass =
    "inline md:flex gap-1 items-center text-[#6b7280] font-bold mb-4 py-2 px-2";
  let activeClass =
    "inline md:flex gap-1 items-center text-white font-bold mb-4 md:border-b-2 border-[#008080] rounded-b-md py-2 px-2";
  let firstLetter = "";
  if (user) {
    firstLetter = user[0];
  }
  return (
    <aside className=" bg-[#1E1E1E] min-h-screen shadow-2xl py-10 flex flex-col  max-md:min-w-[50px] justify-between min-w-[230px]">
      <div className="flex flex-col items-center">
        {/* <img src={expenseIcon} alt="Expense Icon" className="w-16 " /> */}
        <Radar size={40} className="text-[#008080]" />
        <h1 className=" mb-10 font-bold text-xl text-[#008080] hidden md:inline">
          Expense Tracker
        </h1>
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/dashboard"
          >
            <LayoutDashboardIcon />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/categories"
          >
            <Shapes />
            <span className="hidden md:inline">Categories</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/income"
            onClick={() => incomePage()}
          >
            <TrendingUp />
            <span className="hidden md:inline">Income</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/expenses"
            onClick={() => expensePage()}
          >
            <TrendingDown />
            <span className="hidden md:inline">Expenses</span>
          </NavLink>
        </nav>
      </div>
      <div className="flex flex-col items-center">
        {user ? (
          <button
            className={`${linkClass} cursor-pointer`}
            onClick={handleLogout}
          >
            <LogOut />
            <span className="hidden md:inline">Logout</span>
          </button>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            to="/login"
          >
            <LogIn />
            <span className="hidden md:inline">Login</span>
          </NavLink>
        )}
        {user ? (
          <div className="hidden md:inline">
            <div className="flex items-center w-full justify-center gap-3 flex-wrap flex-col">
              <div className="w-[50px] h-[50px] bg-transparent border-2 border-[#CDAF94] rounded-full flex justify-center items-center text-4xl">
                <span className="mt-[-9px] text-[#CDAF94]">{firstLetter}</span>
              </div>
              <div className="text-center flex flex-col">
                <p className="text-[#CDAF94] font-semibold">{user}</p>
                <p className="text-[#CDAF94] font-semibold">{email}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;

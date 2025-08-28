import expense from "../assets/expense icon.png";
import { LayoutDashboardIcon, HandCoins, Shapes } from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    let linkClass = "flex gap-1 items-center text-[#71717a] font-bold mb-4 py-2";
    let activeClass = "flex gap-1 items-center text-[#71717a] font-bold mb-4 border-b-2 border-[#6366f1] rounded-b-md py-2"
  return (
    <aside className="w-[250px] bg-white h-screen rounded-tr-2xl shadow-2xl py-10 flex flex-col border-r-1 border-r-black items-center">
      <img src={expense} alt="Expense Icon" className="w-20 " />
      <h1 className=" mb-10 font-bold text-xl">Expense Tracker</h1>
      <nav>
        <NavLink className={({isActive}) => isActive ? activeClass : linkClass} to="/dashboard">
          <LayoutDashboardIcon className="" />
          Dashboard
        </NavLink>
        <NavLink className={({isActive}) => isActive ? activeClass : linkClass} to="/expenses">
          <HandCoins />
          Expenses
        </NavLink>
        <NavLink className={({isActive}) => isActive ? activeClass : linkClass} to="/categories">
          <Shapes />
          Categories
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

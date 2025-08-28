import expense from "../assets/expense icon.png";
import { LayoutDashboardIcon, HandCoins} from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="w-[250px] bg-white h-screen rounded-tr-2xl shadow-2xl py-10 flex flex-col border-r-1 border-r-black items-center">
      <img src={expense} alt="Expense Icon" className="w-20 " />
      <h1 className=" mb-10 font-bold text-xl">Expense Tracker</h1>
      <nav>
        <NavLink className="flex gap-1 items-center text-[#71717a] font-bold">
            <LayoutDashboardIcon className=""/>
            Dashboard
        </NavLink>
        <NavLink className="flex gap-1 items-center text-[#71717a] font-bold">
            <HandCoins/>
            Expenses
        </NavLink>
        <NavLink className="flex gap-1 items-center text-[#71717a] font-bold">
            Categories
        </NavLink>
      </nav>
      
    </aside>
  );
};

export default Sidebar;

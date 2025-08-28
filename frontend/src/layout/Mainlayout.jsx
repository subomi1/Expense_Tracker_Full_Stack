import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function Mainlayout() {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

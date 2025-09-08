import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { User } from "lucide-react";
const Navbar = ({ name }) => {
  const { user, email } = useContext(AuthContext);
  console.log(user, email);
  let firstLetter = "";
  if (user) {
    firstLetter = user[0];
  }
  return (
    <nav className="w-full bg-[#F5F3F0] shadow-md py-3 px-8 flex justify-between items-center mb-10 border-b-2 border-b-[#A8A2A3]">
      <h1 className="text-[#3D352E] text-2xl font-bold">{name}</h1>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="w-[50px] h-[50px] bg-[#6366f1] rounded-full flex justify-center items-center text-4xl">
            <span className="mt-[-9px] text-white">{firstLetter}</span>
          </div>
        ) : (
          <div className="w-[50px] h-[50px] bg-[#6366f1] rounded-full flex justify-center items-center text-4xl">
            <span className=" text-white">
              <User />
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

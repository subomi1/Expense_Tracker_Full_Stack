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
    <nav className="w-full bg-[#1E1E1E] shadow-md py-3 px-4 md:px-8 flex justify-between items-center mb-10">
      <h1 className="text-[#EAEAEA] text-2xl font-bold">{name}</h1>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center text-4xl border-[1px] border-[#008080]">
            <span className="mt-[-9px] text-[#008080]">{firstLetter}</span>
          </div>
        ) : (
          <div className="w-[50px] h-[50px] bg-transparent rounded-full flex justify-center items-center text-4xl">
            <span className=" text-[#008080]">
              <User />
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

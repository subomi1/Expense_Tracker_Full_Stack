import Navbar from "../components/Navbar";
export default function Register() {
  return (
    <div className="w-full">
      <Navbar name="Login" />
      <form action="">
        <input type="text" placeholder="Enter your username" />
        <input type="text" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
      </form>
    </div>
  );
}

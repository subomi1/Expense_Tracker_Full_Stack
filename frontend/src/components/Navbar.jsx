const Navbar = ({name}) => {
  return (
    <nav className="w-full bg-white shadow py-3 px-8 flex justify-between items-center mb-10">
        <h1 className="text-[#6366f1] text-2xl font-bold">{name}</h1>
        <div className="profile">
            <h1>Username</h1>
        </div>
    </nav>
  )
}

export default Navbar
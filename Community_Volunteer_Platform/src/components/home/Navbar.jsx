// import React, { useState } from "react";
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [currentUser , setCurrentUser] = useState(null)
  useEffect(()=>{
    const  storedUser = JSON.parse(localStorage.getItem("CurrentUser"));
    if (storedUser) {
      setCurrentUser(storedUser)
    }
  },[]);

  const handleLogout = (()=>{
localStorage.removeItem("currentUser");
setCurrentUser(null);
navigate("/")
  })

  return (
    <nav className=" p-4 lg:p-1 bg-teal-600 text-white  ">
      <div className="container   bg-amber-4 mx-auto flex items-center justify-between ">
        <div className="lg:mx-3">
          <a
          href=""
          className="text-3xl font-bold"
          
        >
         VoluntHub
        </a>
        </div>
        <button
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          id="menu"
          className="lg:hidden 
          text-neutral-900 
          hover:text-neutral-700
          transition-colors 
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-8 w-8 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <div
          role="menubar"
          className={`
          ${isMenuOpen ? "flex" : "hidden"}
         flex-col gap-4 absolute 
         right-0 left-0 top-16 lg:flex lg:flex-row lg:static lg:shadow-none
          lg:justify-between
         lg:w-full
         p-5
         lg:p-3
         text-center text-lg 
         lg:items-center
         text-white
          bg-teal-600 shadow-xl `}>
            
          <div  className="flex flex-col gap-4 lg:flex-row lg:justify-around lg:gap- bg-red-5 lg:w-1/2 mx-auto" >
           {/* <Link to="/VolunteerDashboard"  onClick={() => setIsOpen(false)}>
            <span  role="menuitem" className="">
            Dashboard
          </span>
           </Link> */}
          <a href="#" role="menuitem" className="">
            About
          </a>
          <a href="#" role="menuitem" className="">
            Contact
          </a>
           <a href="#" role="menuitem" className="">
            Contact
          </a>
          </div>
       
        {currentUser? (
           <div className="lg:flex block  items-center gap-4 mx-auto">
         <div>
           <span className="font-medium">
           Hi, {currentUser.name}
          </span>
         </div>
          <button onClick={handleLogout} className="py-2 px-6 bg-teal-700 rounded-lg 
         text-white shadow-xl hover:shadow-none">
          Logout
          </button>
          </div>


          ): (
          
          <Link to="/login">
          <span
           
            role="menuitem"
            className="py-2 px-6 bg-teal-700 rounded-lg 
         text-white shadow-xl hover:shadow-none"
          >
            Login
          </span>
          </Link>
        )}

    



        </div>
      </div>
    </nav>
  );
}

export default Navbar;

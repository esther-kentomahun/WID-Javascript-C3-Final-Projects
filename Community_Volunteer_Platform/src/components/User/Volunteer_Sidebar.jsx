import { useState } from "react";
import { NavLink } from "react-router-dom";
function VolunteerSidebar({ isOpen, setIsOpen }) {
    return (
         <aside
          className={`
         p-3
         fixed
         top-0
         left-0
         h-screen
         w-64
         z-50
         bg-teal-200 
         shadow-md
         transform
         transition-transform
         duration-300
         ${isOpen ? "translate-x-0" : "-translate-x-full"}
         lg:translate-x-0
        `}
        >
          <div className="flex justify-end p-1 lg:hidden ">
            <button className="text-white" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="py-5  bg-white rounded-lg text-black text-center"><span className="text-6xl text-black ">👤</span></div>
         <NavLink to="/">

          <div className="p-3 mt-1 hover:bg-teal-200  rounded-lg">Home</div>
          </NavLink>
          <NavLink to="/VolunteerDashboard">

          <div className="p-3 mt-1 bg-white rounded-lg">Dashboard</div>
          </NavLink>
          <NavLink to="/VolunteerDashboard/Applications">
          <div className="p-3 bg-white mt-2 rounded-lg">My Applications</div>
          </NavLink>
          <NavLink to="/VolunteerDashboard/Opportunities">
          <div className="p-3 mt-1 bg-white rounded-lg">
            Browse Opportunities
          </div>
          </NavLink>
          <NavLink to="/VolunteerDashboard/Profile">

          <div className="p-3 mt-1 bg-white rounded-lg">Profile</div>
          </NavLink>
          <div className="p-3 mt-1 bg-white rounded-lg">Help</div>
        </aside>
    )
}
export default VolunteerSidebar
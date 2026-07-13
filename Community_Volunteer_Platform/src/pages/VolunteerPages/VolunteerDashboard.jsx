import { useState , useEffect} from "react";
import Volunteer_Nav from "../../components/User/Volunteer_Nav";
import VolunteerSidebar from "../../components/User/Volunteer_Sidebar";
import { Outlet } from "react-router-dom";
function VolunteerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white min-h-screen ">
      <div className="flex"> 
        <VolunteerSidebar  isOpen={isOpen} setIsOpen={setIsOpen}/>

        <main className="flex-1 lg:ml-64 ">
          <Volunteer_Nav setIsOpen={setIsOpen} />
      
      <div className="p-6 bg-w h-">
        <Outlet />
      </div>
        </main>
     
       
      </div>
    </div>
  );
}
export default VolunteerDashboard;

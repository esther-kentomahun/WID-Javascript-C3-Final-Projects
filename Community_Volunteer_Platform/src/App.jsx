import {BrowserRouter , Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/home/Home.jsx";
import NgoDashboard from "./pages/NgoDashboard.jsx";
import VolunteerDashboard from "./pages/VolunteerPages/VolunteerDashboard.jsx";
import VolunteerNav from "./components/User/Volunteer_Nav.jsx";
import Profile from "./pages/VolunteerPages/Profile.jsx";
import DashboardHome from "./pages/VolunteerPages/DashboardHome.jsx";
import Opportunities from "./pages/VolunteerPages/Opportunities.jsx";
import Applications from "./pages/VolunteerPages/Applications.jsx";
import ApplicationForm from "./pages/VolunteerPages/ApplicationForm.jsx"
// import Dashboard from "./components/Admin/Dashboard.jsx";

function App() {
  return (
    <div>
      {/*<NgoDashboard />*/}
      {/*<Login />*/}
      {/*<Home />*/}
     <BrowserRouter>
     <Routes>
      <Route path="/" element= { <Home/> } />
      <Route path="/login" element= { <Login/> } />

      <Route path="/VolunteerDashboard" element= { <VolunteerDashboard/> }>
      <Route index element={<DashboardHome/>} />
      <Route path="Profile" element={<Profile />} />
      <Route path="Opportunities" element={<Opportunities />} />
      <Route path="Applications" element={<Applications />} />
       <Route path="Apply/:projectid" element={<ApplicationForm/>} />
       </Route>

      {/* <Route path="/Dashboard" element= { <Dashboard/> } /> */}
      <Route path="/ngo-dashboard" element={<NgoDashboard/>} />
     </Routes>
     </BrowserRouter> 
    </div>
  );
}
export default App; 
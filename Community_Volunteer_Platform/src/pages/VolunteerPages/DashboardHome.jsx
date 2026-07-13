import { useEffect, useState } from "react"
function DashboardHome() {
  const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"))
  const [applications , setApplications ] = useState([]);
  useEffect(()=>{
   const storedApplications = JSON.parse(localStorage.getItem("allVolunteerApplications")) || [];
   setApplications(storedApplications)
  },[]);
   
  const myApplications = applications.filter((Applicant)=>
    Applicant.volunteerEmail === CurrentUser?.email
  ) ;
  const totalApplications = myApplications.length;

const pendingApplications = myApplications.filter(
  (application) => application.status === "Pending"
).length;

const approvedApplications = myApplications.filter(
  (application) => application.status === "Accepted"
).length;

const rejectedApplications = myApplications.filter(
  (application) => application.status === "Declined"
).length;
  //console.log(myApplications);
  
    return(
        <div>
              <section>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6  mt-3">
         
            <div className="bg-white rounded-2xl lg:col-span-1 p-6 shadow-md">
  <h2 className="text-2xl font-bold text-teal-600">
    Welcome, {CurrentUser?.name} 👋
  </h2>

  <p className="text-gray-600 mt-2">
    Here's an overview of your volunteer activities.
  </p>
</div>
         
         
        </div>
          <div className="bg-white rounded-2xl lg:col-span-2 p-6 shadow-md">
            
  <h2 className="text-xl font-bold mb-4">
    Application Overview
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="bg-teal-50 p-4 rounded-lg">
      <h3 className="text-3xl font-bold">{totalApplications}</h3>
      <p>Total</p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="text-3xl font-bold">{pendingApplications}</h3>
      <p>Pending</p>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-3xl font-bold">{approvedApplications}</h3>
      <p>Approved</p>
    </div>

    <div className="bg-red-50 p-4 rounded-lg">
      <h3 className="text-3xl font-bold">{rejectedApplications}</h3>
      <p>Declined</p>
    </div>
  </div>
</div>
      </section>

      
      {/* <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  mt-3">
          <div className="bg-white rounded-2xl lg:col-span-2 p-6 shadow-md"></div>
          <div className="bg-white rounded-2xl lg:col-span-1 p-6 shadow-md"></div>
        </div>
      </section> */}
        </div>
    )
}
export default DashboardHome
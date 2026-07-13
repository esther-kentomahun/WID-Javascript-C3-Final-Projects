import { useEffect, useState } from "react";

function Applications(){
    const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    const [applications , setApplications ] = useState([]);
    useEffect(()=>{
        const storeApplications = JSON.parse(localStorage.getItem("allVolunteerApplications")) || [];
        setApplications(storeApplications);
    },[])
    const myApplications  = applications.filter((applicants)=>
        applicants.volunteerEmail === CurrentUser.email
    );
    return(
        <div className="p-2">
            <h1 className="text-2xl mb-4 font-bold">Volunteer Application</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myApplications.length > 0 ?(
                    myApplications.map((applicants)=>
                        <div key={applicants.id} className="shadow border rounded-lg p-5">
                            <h2>{applicants.projectTitle}</h2>
                           
                            <p className={`mt-1 font-mono ${applicants.status === "Accepted"? "text-teal-700" : "text-red-700"}`}>status: {applicants.status}</p>
                            <span className="text-sm">{applicants.appliedAt}</span>
                        </div>
                    )
                ) :(
                    <p>No Applications</p>
                )}
            </div>
        </div>
    )
}

export default Applications
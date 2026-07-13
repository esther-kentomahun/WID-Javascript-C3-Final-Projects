import { useParams } from "react-router-dom";
import { useState } from "react";
function ApplicationForm(){
    const { projectid } = useParams();
    const AllProjects =JSON.parse(localStorage.getItem("allPostedOpportunities")) || []

    const selectedProject = AllProjects.find(
        (AllProject)=> AllProject.id === Number(projectid))

    const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"))
console.log("Current users",CurrentUser);
    const [ phone , setPhone] =  useState("");
    const [ skills , setSkills ] = useState("");
    const [ availaibility, setAvailability ] = useState("");
    const [ motivitation, setMotivation] = useState("");

    const handleSubmit =((e) =>{
    e.preventDefault();
    
    
    // check for existing projects 
    const applications = JSON.parse(localStorage.getItem("allVolunteerApplications")) || [];
  // check for users that has already applied 
  const alreadyApplied  = applications.some((application) =>
    application.projectid === selectedProject.id &&
   application.volunteerEmail === CurrentUser.email 
 );
 if (alreadyApplied) {

    alert('You have Already applied for this project')
    return
 }

//  CREATE NEW APLLICATION 
  const newApplications = {
    id:  Date.now(),
    projectid: selectedProject.id,
    projectTitle: selectedProject.title,

    voulunteerName: CurrentUser.name,
    volunteerEmail: CurrentUser.email,

    phone,
    skills,
    availaibility,
    motivitation,

    status: "Pending",
    appliedAt: new Date().toLocaleDateString()
  }
console.log(newApplications);


applications.push(newApplications)
 localStorage.setItem("allVolunteerApplications", JSON.stringify(applications));

 
 alert("Apllications submitted succeesfully")
 setPhone("");
  setSkills("");
  setAvailability("");
  setMotivation("");
    })
    return(
        <div className="lg:max-w-3xl mxauto bg-white shadow-lg rounded-lg p-8">
            <div className="p-6 mt-6 border rounded-lg">
            <h1 className="mb-5 text-4xl font-bold">Application Form </h1>
            <h2 className="font-semibold text-xl">{selectedProject?.title}</h2>
            <p className="mt-2">
                {selectedProject?.description}
            </p>
            <p className="mt-4">
               📍 {selectedProject?.location}
            </p>
            <p className="">
                ⏰ {selectedProject?.duration}
            </p>

            <form action="" className="space-y-5 mt-8" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="FullName block font-medium mb-2">
                        Full Name
                    </label>
                    <input 
                    type="text"
                    value={CurrentUser.name}
                    readOnly
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label htmlFor="FullName block font-medium mb-2">
                       Email
                    </label>
                    <input 
                    type="text"
                    value={CurrentUser.email}
                    readOnly
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                  <div>
                    <label htmlFor="FullName block font-medium mb-2">
                       Phone
                    </label>
                    <input 
                    type="text"
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                  <div>
                    <label htmlFor="FullName block font-medium mb-2">
                       Relevant Skills
                    </label>
                    <input 
                    type="text"
                    value={skills}
                    onChange={(e)=> setSkills(e.target.value)}
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                   <div>
                    <label htmlFor="FullName block font-medium mb-2">
                      Availability
                    </label>
                   <select
                 value={availaibility}
                 onChange={(e) => setAvailability(e.target.value)}
                   className="w-full border rounded-lg p-3"
                  >
                  <option value="">Select Availability</option>
                   <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Flexible">Flexible</option>
                </select>
                </div>

                   <div>
                    <label htmlFor="FullName block font-medium mb-2">
                        Why do you want to volunteer?
                    </label>
                    <textarea 
                    type="text"
                    value={motivitation}
                    onChange={(e)=> setMotivation(e.target.value)}
                    className="w-full border rounded-lg p-3"
                    />
                </div>
                <button 
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg"
                >
              submit
                </button>
                
            </form>
            </div>
        </div>
    )
}
export default ApplicationForm
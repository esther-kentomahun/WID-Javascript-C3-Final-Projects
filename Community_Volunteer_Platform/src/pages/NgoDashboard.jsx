import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NgoDashboard() {
    const [projectTitle, setProjectTitle] = useState(""); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [duration, setDuration] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState (() => {
        const savedUser = localStorage.getItem("CurrentUser");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            return parsedUser.name || "Organization";
        }
        return "Organization";
    });
    //security check in case of bypassers
    // useEffect(() => {
    //     const savedUser = localStorage.getItem("UserData");
    //      if (!savedUser) {
    //         alert("Access Denied: Please login to access the organization Management Portal.");
    //         navigate("/login");
    //     }
    // },[navigate]);
    //Application tab
    const [applicants, setApplicants] = useState(() => {
        //Read the shared storage key
        const savedApps = localStorage.getItem("allVolunteerApplications");
        //load applications if there's any else fall back to empty
        return savedApps ? JSON.parse(savedApps) : [];
    });
    // dashbord calculations
    const totalApplicantsCount = applicants ? applicants.length : 0;
    const approvedApplicantsCount = applicants ? applicants.filter(app => app.status === "Approved" || app.status === "Accepted").length : 0;
    const filledPercentage = totalApplicantsCount > 0 ? Math.round((approvedApplicantsCount / totalApplicantsCount) * 100) : 0;
    const handleStatusChange = (id, newStatus) => {
        setApplicants((prevApplicants) => {
            const updatedApplicants = prevApplicants.map((applicant) =>
                applicant.id === id ? {...applicant, status: newStatus} : applicant
            );
            localStorage.setItem("allVolunteerApplications",JSON.stringify(updatedApplicants));
            return updatedApplicants;
        });
    };
    //Post project tab
    const [postedProjects, setPostedProjects] = useState(() => {
        const savedProjects = localStorage.getItem("allPostedOpportunities");
        return savedProjects ?JSON.parse(savedProjects) : [];
    });
    const handlePostProject = (e) => {
        e.preventDefault();
        const newProject = {
            id: Date.now(),
            title: projectTitle.trim(),
            description: description.trim(),
            location: location.trim(),
            duration: duration.trim(),
            postedBy: orgName,
            status: "Active",
            datePosted: new Date().toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})
        };
        setPostedProjects((prevProjects) => {
            const updated = [newProject, ...prevProjects];
            localStorage.setItem ("allPostedOpportunities", JSON.stringify(updated));
            return updated;
        });
        setProjectTitle("");
        setDescription("");
        setLocation("");
        setDuration("");
        localStorage.setItem("projects", JSON.stringify(newProject))
    };
    //report tab
    const totalCompletedProjects = postedProjects ? postedProjects.filter(p => p.status === "completed").length: 0;
    const totalApprovedVolunteers = applicants ? applicants.filter(a => a.status === "Approved" || a.status === "Accepted").length : 0;
    const handleToggleProjectStatus = (projectId) => {
        const updatedProjects = postedProjects.map((project, index) => {
            if (project.id === projectId) {
                const newStatus = project.status === "Completed" ? "Active" : "Completed";
                return { ...project, status: newStatus };
            }
            return project;
        });
        setPostedProjects(updatedProjects);
        localStorage.setItem("allPostedOpportunities", JSON.stringify(updatedProjects));
    };
    const activeInitiativesCount = postedProjects ? postedProjects.filter((project) => project.status !== "Completed").length : 0;
    //settings tab
    const currentUserData = JSON.parse(localStorage.getItem("CurrentUser"));
    const [profileName, setProfileName] = useState(currentUserData.name);
    const [profileEmail, setProfileEmail] = useState(currentUserData.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Feedback messages
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        //Password verification (only if filling out password fields)
        if (newPassword || confirmPassword || currentPassword) {
            if (!currentPassword) {
                setErrorMsg("Please enter your current password.");
                return;
            }
            if (currentUserData.password && currentPassword !== currentUserData.password) {
                setErrorMsg("Current password is incorrect.");
                return;
            }
            if (newPassword.length < 6) {
                setErrorMsg("New password must be at least 6 characters.");
                return;
            }
            if (newPassword !== confirmPassword) {
                setErrorMsg("New password and confirm password do not match.");
                return;
            }
        }
        //Build updated user object
        const updatedUser = {
            ...currentUserData,
            name: profileName,
            email: profileEmail,
            password: newPassword ? newPassword : currentUserData.password,
        };
        //Save to LocalStorage
        localStorage.setItem("CurrentUser", JSON.stringify(updatedUser));
        // Update main UserData array if it exists
        const allUsers = JSON.parse(localStorage.getItem("UserData") || "[]");
        if (allUsers.length > 0) {
            const updatedAllUsers = allUsers.map((u) => 
                u.email === currentUserData.email ? updatedUser : u
            );
            localStorage.setItem("UserData", JSON.stringify(updatedAllUsers));
        }
        //Update state feedback
        setOrgName(profileName);
        setSuccessMsg("Profile updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };
    const handleLogout = () => {
        // Clear the active session tracking from LocalStorage
        localStorage.removeItem("CurrentUser");
        // Clear any local state tracking if needed
        setCurrentUser(null); 
        alert("You have been securely logged out.");
        navigate("/login");
    };
    return (
        <div className="w-full min-h-screen bg-teal-200 flex flex-col md:flex-row text-left">
            {/*MOBILE TOP HEADER*/}
            <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">Organization Portal Admin</span>
                </div>
                {/*Hamburger Toggle Button*/}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none" aria-label="Toggle navigation menu">
                    {isMobileMenuOpen ? (
                        // "X" Close Icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger Icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
               </button>
           </div>
               {/*OVERLAY BACKDROP (MOBILE ONLY)*/}
               {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}/>
                )}
                {/*SIDEBAR / SLIDE-OUT DRAWER*/}
                <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-teal-50 border-r border-gray-200 p-6 flex flex-col
                    transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 md:min-h-screen`}>
                    {/* Header info */}
                    <div className="mb-8 text-left">
                        <h2 className="text-lg font-bold text-gray-900">Organization Portal Admin</h2>
                        <p className="text-xs text-gray-500">NGO Portal v1.0</p>
                   </div>
                   {/* Navigation Links */}
                    <nav className="space-y-1 flex-1">
                        {[
                            { id: "home", label: "Home"},
                            { id: "dashboard", label: "Dashboard"},
                            { id: "post-opportunity", label: "Post Opportunity"},
                            { id: "applications", label: "Applications"},
                            { id: "reports", label: "Reports"},
                            { id: "settings", label: "Settings"},
                        ].map((tab) => (
                            <button
                                key={tab.id} onClick={() => {
                                    if (tab.id === "home") {
                                        navigate("/");
                                    } else {
                                      setActiveTab(tab.id);
                                      setIsMobileMenuOpen(false); // Closes the drawer automatically after selecting a tab!
                                    }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left 
                                ${activeTab === tab.id ? "bg-teal-100 text-amber-900 border border-teal-300 font-semibold" : "text-gray-600 hover:bg-teal-100/50"}`}>
                                <span>{tab.label}</span>
                           </button>
                        ))}
                    </nav>
                    {/* User profile section */}
                    <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">Org</div>
                        <div className="text-left">
                            <p className="text-xs font-semibold text-gray-800">Organization Portal Team</p>
                            <p className="text-[10px] text-gray-500">Manager Account</p>
                        </div>
                    </div>
                </aside>
            {/*RIGHT CONTENT WORKSPACE CANVASES*/}
            <main className="flex-1 w-full max-w-4xl p-4 pt-4 md:p-8">
                {/* Welcome Dashboard Header */}
                <header className="mb-6 block text-left">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome, {orgName} Team!</h2>
                    <p className="text-md text-gray-800 mt-1">Community Volunteer Platform for {orgName} NGO</p>
               </header>
               {/*DASHBOARD TAB*/}
               {activeTab === "dashboard" && (
                    <div className="space-y-10">
                        {/* METRICS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-700 uppercase">Active Initiatives</p>
                                <p className="text-4xl font-light tracking-tight text-gray-900 mt-2">
                                    {activeInitiativesCount}
                               </p>
                            </div>
                            {/* Card 2 */}
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-700 uppercase">Total Applications</p>
                                <p className="text-4xl font-light tracking-tight text-gray-900 mt-2">{totalApplicantsCount}</p>
                            </div>
                            {/* Card 3 */}
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-700 uppercase">Positions Filled</p>
                                <p className="text-4xl font-light tracking-tight text-gray-900 mt-2">{filledPercentage}%</p>
                            </div>
                       </div>
                       {/* RECENT POSTS TABLE */}
                       <div className="space-y-4">
                            <h3 className="text-lg font-medium tracking-tight text-gray-800">Recent Overview</h3>
                            <div className="border border-gray-100 rounded-xl overflow-x-auto w-full bg-white shadow-sm">
                                <table className="w-full text-left font-light text-sm min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-medium tracking-wider text-gray-800 uppercase">
                                            <th className="p-4 font-medium">Project Title</th>
                                            <th className="p-4 font-medium">Location</th>
                                            <th className="p-4 font-medium">Duration</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium text-right">Action</th>
                                       </tr>
                                   </thead>
                                   <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                                        {postedProjects && postedProjects.length > 0 ? (
                                            postedProjects.map((project, index) => (
                                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="p-4 font-medium text-gray-700">{project.title}</td>
                                                    <td className="p-4 text-gray-600">{project.location}</td>
                                                    <td className="p-4 text-gray-600">{project.duration}</td>
                                                    <td className="p-4 font-medium">
                                                        <span className={`px-3 py-1 rounded full text-xs font-medium ${project.status === "Completed" ? "bg-gray-100 text-gray-600"
                                                            : "bg-green-100 text-green-700"}`}>
                                                            {project.status || "Active"}
                                                       </span>
                                                   </td>
                                                   <td className="p-4 text-right">
                                                        <button onClick={() => handleToggleProjectStatus(project.id)}
                                                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                                                project.status === "Completed" ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                                                : "bg-teal-600 hover:bg-teal-700 text-white"
                                                            }`}>{project.status === "Completed" ? "Reopen Initiative" : "Mark Completed"}
                                                        </button>
                                                   </td>
                                               </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-gray-400 font-light italic">
                                                    No initiatives published yet. Switch to the Post Opportunity tab to begin.
                                               </td>
                                           </tr>
                                        )}
                                   </tbody>
                               </table>
                           </div>
                       </div>
                   </div>
                )}
                {/*EXISTING FORM CARD AND ACTIVE LISTINGS*/}
               {activeTab === "post-opportunity" && (
                    <div className="block w-full max-w-4xl mx-auto mt-0 md:mt-8">
                        {/*HEADER*/}
                        <header className="mb-8 border-b border-gray-200 pb-4">
                            <h1 className="text-2xl font-bold tracking-tight">NGO/ORGANIZATION Management Portal</h1>
                            <p className="text-md text-gray-800 mt-1">Controlled Form State Dashboard</p>
                        </header>
                        {/*TEXT INPUTS SLOTS ONLY*/}
                        <section className="block w-full max-w-xl bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6 max-auto">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 block text-left">Draft New Listing</h2>
                            <form onSubmit={handlePostProject} className="block w-full space-y-5">
                                <div className="block w-full space-y-5">
                                    {/*PROJECT TITLE FIELD*/}
                                    <div className="block w-full">
                                        <label className="block text-md font-semibold text-gray-800 mb-2 text-left">Project Title: </label>
                                        <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
                                            placeholder="e.g., Mobile Clinic Outreach"
                                            className="block w-full p-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                                            required
                                       />
                                   </div>
                                   {/*PROJECT DESCRIPTION FIELD*/}
                                   <div className="block w-full">
                                       <label className="block text-md font-semibold text-gray-800 mb-2 text-left">Description: </label>
                                       <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                            placeholder="e.g., Describe project and volunteer task"
                                            className="block w-full p-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                            required
                                       />
                                   </div>
                                   {/*LOCATION & DURATION*/}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                       {/*LOCATION INPUT FIELD*/}
                                       <div className="block w-full">
                                           <label className="block text-md font-semibold text-gray-800 mb-2 text-left">Location: </label>
                                           <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                                               placeholder="e.g., Remote/Lagos, Nigeria"
                                              className="block w-full p-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                                              required
                                           />
                                        </div>
                                        {/*DURATION INPUT FIELD*/}
                                        <div className="block w-full">
                                            <label className="block text-md font-semibold text-gray-800 mb-2 text-left">Duration: </label>
                                            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                                                placeholder="e.g., 3 weeks / 5hrs a day"
                                                className="block w-full p-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                                                required
                                           />
                                       </div>
                                   </div>
                               </div>
                               <button type="submit"
                                    className="block w-full p-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm rounded-lg transition-all shadow-sm cursor-pointer">
                                    Publish Initiative   
                                </button>
                           </form>
                        </section>
                        {/*ACTIVE LISTING FEED*/}
                        <section className="w-full max-w-xl mt-8">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 text-left">
                                Active Listings ({postedProjects ? postedProjects.filter(p => p.status !== "Completed").length : 0})
                            </h3>
                            {postedProjects.length === 0 ? (
                                <div className="bg-gray-100 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 text-sm">
                                    No active initiatives published yet. Use the form above to deploy your first listing.
                               </div>
                            ) : (
                                <div className="space-y-4">
                                    {postedProjects.map((project) => (
                                        <div key={project.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left group relative">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-blue-600 transition-colours">{project.title}</h4>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${project.status === "Completed"
                                                    ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                                                    {project.status || "Active"}
                                               </span>
                                           </div>
                                            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-400 border-b border-gray-50 pb-3 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <span>📍</span> {project.location}
                                               </span>
                                               <span className="flex items-center gap-1">
                                                    <span>🕒</span> {project.duration}
                                                </span>
                                           </div>
                                           <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                              {project.description}
                                           </p>
                                       </div>
                                    ))}
                               </div>
                            )}
                        </section>
                   </div>
               )}
               {activeTab === "applications" && (
                    <div className="space-y-6 animate-fade-in text-left">
                        {/* Heading Section */}
                        <div>
                            <h3 className="text-xl font-medium tracking-tight text-gray-900">Volunteer Submissions</h3>
                            <p className="text-md text-gray-800 mt-1">Review and manage individuals who applied for your initiatives.</p>
                        </div>
                        {/* Table Container */}
                        <div className="border border-gray-100 rounded-xl overflow-x-auto bg-white shadow-sm">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold tracking-wider text-gray-800 uppercase">
                                        <th className="p-4 font-medium">Volunteer</th>
                                        <th className="p-4 font-medium">Applied Position</th>
                                        <th className="p-4 font-medium">Volunteer id</th>
                                        <th className="p-4 font-medium">Email</th>
                                        <th className="p-4 font-medium">Skills</th>
                                        <th className="p-4 font-medium">Availability</th>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
                                    {applicants.map((applicant) => (
                                        <tr key={applicant.id } className="hover:bg-gray-50/50 transition-colors">
                                            {/* Profile Details */}
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{applicant.voulunteerName}</div>
                                           </td>
                                           {/* Position */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.position || applicant.projectTitle}</td>
                                           {/* id */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.id}</td>
                                           {/* Email */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.volunteerEmail}</td>
                                           {/* Skills */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.skills}</td>
                                           {/* availability */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.availability || applicant.availaibility}</td>
                                           {/* Date */}
                                           <td className="p-4 text-gray-800 font-light">{applicant.date || applicant.appliedAt}</td>
                                           {/* Interactive Dynamic Badge */}
                                           <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                    applicant.status === "Accepted" ? "bg-green-50 text-green-700 border-green-100" : applicant.status === "Declined" ? "bg-red-50 text-red-700 border-red-100" : "bg-yellow-50 text-yellow-700 border-yellow-100"}`}>
                                                    {applicant.status}
                                               </span>
                                           </td>
                                           {/* Action Buttons */}
                                           <td className="p-4 text-right space-x-4">
                                                {applicant.status === "Pending" ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleStatusChange(applicant.id, "Accepted")}
                                                            className="text-xs font-medium text-green-600 hover:text-green-800 transition-colors">
                                                            Accept
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusChange(applicant.id, "Declined")}
                                                            className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors">
                                                            Decline
                                                       </button>
                                                   </>
                                                ) : (
                                                    <span className="text-xs text-gray-500 italic font-light">Processed</span>
                                                )}
                                            </td>
                                       </tr>
                                    ))}
                               </tbody>
                           </table>
                       </div>
                   </div>
                )}
                {/*Report tab*/}
                {activeTab === "reports" && (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Impact Reports & Analytics</h2>
                                <p className="text-sm text-gray-500">Track your organization's outreach metrics and volunteer engagement.</p>
                           </div>
                           {/* Print / Export Action */}
                           <button onClick={() => window.print()} 
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 self-start md:self-auto">
                                Export Summary
                           </button>
                        </div>
                        {/* Metric Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Total Opportunities Posted</p>
                                <p className="text-3xl font-light text-gray-900 mt-2">{postedProjects.length}</p>
                           </div>
                           <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Completed Initiatives</p>
                                <p className="text-3xl font-light text-gray-900 mt-2">
                                    {postedProjects.filter(p => p.status === "Completed").length}
                               </p>
                            </div>
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Approved Volunteers</p>
                                <p className="text-3xl font-light text-gray-900 mt-2">
                                    {applicants.filter(a => a.status === "Approved" || a.status === "Accepted").length}
                               </p>
                           </div>
                       </div>
                       {/* Project Performance Breakdown Table */}
                       <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-800">Initiative Performance Breakdown</h3>
                            <div className="border border-gray-100 rounded-xl overflow-x-auto bg-white shadow-sm">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-medium tracking-wider text-gray-800 uppercase">
                                            <th className="p-4">Initiative Title</th>
                                            <th className="p-4">Location</th>
                                            <th className="p-4">Total Applicants</th>
                                            <th className="p-4">Approved</th>
                                            <th className="p-4">Current Status</th>
                                       </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                                        {postedProjects && postedProjects.length > 0 ? (
                                            postedProjects.map((project, idx) => {
                                                // Calculate applicants per project title
                                                const projectApps = applicants? applicants.filter(a => (a.projectTitle || a.position) === project.title) : [];
                                                const approvedCount = projectApps.filter(a => a.status === "Approved" || a.status === "Accepted").length;
                                                return (
                                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="p-4 font-medium text-gray-800">{project.title}</td>
                                                        <td className="p-4 text-gray-600">{project.location}</td>
                                                        <td className="p-4 text-gray-600">{projectApps.length}</td>
                                                        <td className="p-4 text-gray-600 font-medium text-green-600">{approvedCount}</td>
                                                        <td className="p-4">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                                project.status === "Completed" ? "bg-gray-100 text-gray-600"
                                                                : "bg-green-100 text-green-700"}`}>{project.status || "Active"}
                                                           </span>
                                                       </td>
                                                   </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-6 text-center text-gray-400">
                                                    No project data available to report.
                                                </td>
                                            </tr>
                                        )}
                                   </tbody>
                              </table>
                           </div>
                       </div>
                  </div>
                )}
                {/*Settings tab*/}
                {activeTab === "settings" && (
                    <div className="space-y-6 max-w-2xl text-left">
                        {/*Alert Notifications*/}
                        {successMsg && (
                            <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                                {successMsg}
                           </div>
                        )}
                        {errorMsg && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                                {errorMsg}
                            </div>
                        )}
                        {/* Profile Edit Form */}
                        <form onSubmit={handleUpdateProfile} className="bg-white/80 backdrop-blur border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
                            <h3 className="text-lg font-bold text-gray-800">Edit Organization Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                        Organization Name
                                   </label>
                                   <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} required
                                        className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-teal-600 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                        Email Address
                                    </label>
                                    <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required
                                        className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-teal-600 transition-colors"
                                    />
                               </div>
                           </div>
                           <hr className="border-gray-100 my-4" />
                            {/*Security Section*/}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-700">Security / Change Password</h4>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Current Password
                                    </label>
                                    <input type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-teal-600 transition-colors"
                                    />
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            New Password
                                       </label>
                                       <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-teal-600 transition-colors"
                                        />
                                   </div>
                                   <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Confirm New Password
                                       </label>
                                       <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-teal-600 transition-colors"
                                        />
                                   </div>
                               </div>
                           </div>
                           <div className="pt-2">
                                <button type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-sm transition-colors cursor-pointer">
                                    Save Changes
                               </button>
                           </div>
                        </form>
                        {/*Logout Box*/}
                        <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Account Actions</h3>
                            <p className="text-sm text-gray-500 mb-6">Manage your session settings and secure access to the platform portal.</p>     
                            <button type="button"
                                onClick={() => {
                                    localStorage.removeItem("CurrentUser");
                                    alert("You have been securely logged out.");
                                    navigate("/login");
                                }}
                                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                                Log Out Account
                           </button>
                       </div>
                   </div>
                )}
           </main>
       </div>
    );
}
export default NgoDashboard;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("volunteer");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedEmail = email.trim().toLowerCase();
    if (!formattedEmail.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    if (isLoginTab) {
      const existingUserRaw = localStorage.getItem(formattedEmail);
      if (!existingUserRaw) {
        alert(
          "Account not found. please switch to the 'Create Account' tab to sign up first!",
        );
        return;
      }
      const UserData = JSON.parse(existingUserRaw);
      if (UserData.password !== password) {
        alert("Incorrect password. Please try again.");
        return;
      }
      const CurrentUser = localStorage.setItem("CurrentUser", JSON.stringify(UserData));
      if (UserData.role === "volunteer") {
          const firstName = UserData.name.split(" ")[0];
          alert(
              `Welcome back, ${firstName}! Redirecting to volunteer Dashboard...`,);
            navigate("/VolunteerDashboard");
      } else {
        alert(
          `Welcome back, ${UserData.name}! Redirecting to your NGO Dashboard...`,
          
        );
        navigate("/ngo-dashboard");
      }
    } else {
      if (password.length < 6) {
        alert("Your password must be at least 6 characters long.");
        return;
      }
      const existingEmail = localStorage.getItem(formattedEmail);
      if (existingEmail) {
        alert(
          "This email is already registered. Please switch to the 'Login' tab.",
        );
        return;
      }
      const newUserProfile = {
        name: fullName.trim(),
        email: formattedEmail,
        password: password,
        role: userRole,
      };
      //saving the profile object to localStorage using the email as the unique identifier key
      localStorage.setItem(formattedEmail, JSON.stringify(newUserProfile));
      if (userRole === "volunteer") {
        const firstName = fullName.trim().split(" ")[0];
        alert(`Account created successfully! Welcome, ${firstName}.`);
      } else {
        alert(`Account created Successfully! Welcome, ${fullName.trim()}.`);
      }
      setIsLoginTab(true);
    }
  };
  return (
    <div className="min-h-screen w-h-full flex items-center justify-center bg-teal-200 relative p-4">
      <div className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30 pointer-events-none" />
      {/*main form box*/}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8 relative z-10">
        {/*header text*/}
        <div className="text-center  mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {isLoginTab ? "Join the Community" : "Create an account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isLoginTab
              ? "Sign Up or Login to make an impact."
              : "Get started by filling in your details."}
          </p>
        </div>
        {/*Tab switcher*/}
        <div className="w-full flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setIsLoginTab(true)}
            className={`w-1/2 py-3 text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${isLoginTab ? "border-teal-500 text-teal-500" : "border-transparent text-gray-400 hover:text-gray-800"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLoginTab(false)}
            className={`w-1/2 py-3 text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${!isLoginTab ? "border-teal-500 text-teal-500" : "border-transparent text-gray-400 hover:text-gray-800"}`}
          >
            Sign Up
          </button>
        </div>
        {/*Form inputs*/}
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleSubmit}
        >
          {/*CONDITIONAL NAME INPUT (SIGN UP ONLY*/}
          {!isLoginTab && (
            <div className="w-full flex flex-col text-left">
              <label className="text-sm font-semibold text-gray-900 mb-2">
                {userRole === "volunteer" ? "Full Name:" : "Organization Name:"}
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    userRole === "volunteer"
                      ? "Enter your full name"
                      : "Enter your organization name"
                  }
                  className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required={!isLoginTab}
                />
              </div>
            </div>
          )}
          {/*Email input*/}
          <div className="w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-900 mb-2 text-left w-full">
              Email Address:
            </label>
            <div className="relative w-full">
              {/*Envelope icon*/}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 opacity-40">
                ✉️
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work or voluteer email"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>
          {/*Password input*/}
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center mb-2 w-full">
              <label className="text-sm font-semibold text-gray-900">
                Password
              </label>
              {isLoginTab && (
                <a
                  href="#forgot"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative w-full">
              {/*Lock icon*/}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointed-events-none text-gray-400 opacity-40">
                🔒
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-white border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 opacity-40 text-lg cursor-pointer select-none hover:opaciy-70 p-1"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {/*CONDITIONAL ROLE SELECTION (SIGN UP ONLY)*/}
          {!isLoginTab && (
            <div className="w-full flex flex-col mt-2">
              <label className="text-sm font-semibold text-gray-900 mb-2 text-left">
                I am signing up as:
              </label>
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Volunteer Option Button */}
                <button
                  type="button"
                  onClick={() => setUserRole("volunteer")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    userRole === "volunteer"
                      ? "border-teal-600 bg-teal-50 text-teal-700 font-semibold ring-1 ring-teal-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  👤 A Volunteer
                </button>
                {/* NGO / Organization Option Button */}
                <button
                  type="button"
                  onClick={() => setUserRole("ngo")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    userRole === "ngo"
                      ? "border-teal-600 bg-teal-50 text-teal-700 font-semibold ring-1 ring-teal-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  🏢 An NGO / Organization
                </button>
              </div>
            </div>
          )}
          {/*continue button*/}
          <button
            type="submit"
            className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors shadow-sm cursor-pointer">
            {isLoginTab ? "Continue" : "Create Account"}
          </button>
        </form>
        {/*"or continue with" divider line*/}
        <div className="w-full flex flex-col items-center mt-6">
          <div className="relative w-full flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] font-bold tracking-wider text-gray-600 uppercase z-10">
              OR CONTINUE WITH
            </span>
          </div>
          {/*Social provider Authentication page*/}
          <div className="w-full flex flex-col space-y-3 mt-4">
            {/* --- BRANDED GOOGLE BUTTON --- */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
            >
              {/* Official Google Brand Colors SVG Vector */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
          {/*bottom switcher profile helper*/}
          <p className="text-xs text-gray-500 mt-6 text-center">
            {isLoginTab ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLoginTab(!isLoginTab)}
              className="font-semibold text-orange-600 hover:underline cursor-pointer bg-transparent border-none p-0 inline ms-1 outline-none focus:outline-none focus:ring-0">
              {isLoginTab ? "Create Profile" : "Login Now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;

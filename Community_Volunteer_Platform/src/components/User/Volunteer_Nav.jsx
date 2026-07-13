import { useState, useEffect } from "react";
function Volunteer_Nav({ setIsOpen }) {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <main className="flex-1 p-6 bg-teal-400 text-white">
      <header className="flex justify-between items-center">
        <div className="left flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg bg- shadow"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          <div>
            {currentUser && (
              <h1 className="text-3xl font-bold">
                Welcome , {currentUser.name}
              </h1>
            )}
            {/*<p className="text-white font-bold"> {currentUser.role}</p>*/}
          </div>
        </div>
        <div className="right">
          <div className="flex items-center gap-4">🔔 👤</div>
        </div>
      </header>

    

    </main>
  );
}
export default Volunteer_Nav;

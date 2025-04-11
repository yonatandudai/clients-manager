import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center bg-gray-100 px-4 py-10 min-h-[calc(100vh-64px)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome to the Client Management System</h1>

        {user ? (
          <>
            <div className="mb-4 text-left">
              <p className="mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Role:</span> {user.role}</p>
            </div>

            <div className="flex flex-col gap-6 mb-6">
              <button
                onClick={() => navigate("/clients")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                View Clients
              </button>
              {user.role === "Admin" && (
                <button
                  onClick={() => navigate("/client/new")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Client
                </button>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-6 w-full"
            >
              Logout
            </button>

          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}

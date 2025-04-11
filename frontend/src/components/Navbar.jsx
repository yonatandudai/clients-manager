import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="h-16 sticky top-0 z-50 bg-white shadow-md">
    <div className="container mx-auto h-full px-4 flex justify-center items-center">
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-blue-600 font-semibold hover:underline">Home</Link>
          {!user && (
            <>
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="text-gray-700">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

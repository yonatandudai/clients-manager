import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", {name, email, password, role });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 px-4 py-10 min-h-[calc(100vh-64px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 py-4 rounded shadow-md w-72 h-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-6"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}

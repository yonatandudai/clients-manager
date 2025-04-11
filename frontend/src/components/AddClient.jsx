import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", {
        name,
        phone,
        email,
        companyName,
      });
      alert("Client added successfully!");
      navigate("/clients"); // Redirect to clients list or another page
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add client");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 py-16 min-h-[calc(100vh-64px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 py-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Add New Client</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}

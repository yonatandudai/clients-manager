import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/clients/${id}`);
        setClientData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to fetch client data.");
        navigate("/clients");
      }
    };
    fetchClient();
  }, [id, navigate]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${id}`, clientData);
      alert("Client updated successfully!");
      navigate("/clients");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update client.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
        <p className="text-gray-600">Loading client data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 py-16 min-h-[calc(100vh-64px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 py-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Edit Client</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={clientData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={clientData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={clientData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="text"
          name="companyName"
          placeholder="company Name"
          value={clientData.companyName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </form>

        <button
            type="button"
            onClick={async () => {
                if (window.confirm("Are you sure you want to delete this client?")) {
                try {
                    await api.delete(`/clients/${id}`);
                    alert("Client deleted.");
                    navigate("/clients");
                } catch (err) {
                    console.error(err.response?.data || err.message);
                    alert("Failed to delete client.");
                    }
                }
            }}
            className="mt-4 w-50 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
            Delete Client
        </button>
    </div>
  );
}

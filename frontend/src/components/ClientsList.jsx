import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Papa from "papaparse";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to fetch clients.");
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(c => c._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete client.");
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, clients]);

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredClients.map(({ name, phone, email, companyName }) => ({
        Name: name,
        Phone: phone,
        Email: email,
        Company: companyName,
      }))
    );
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="px-4 py-10 min-h-[calc(100vh-64px)] bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Clients List</h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded"
            />

            <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
                Export to CSV
            </button>
        </div>

        <p className="text-sm text-gray-500 mb-2">
        Showing {filteredClients.length} {filteredClients.length === 1 ? "client" : "clients"}
        </p>

        {filteredClients.length === 0 ? (
          <p className="text-center text-gray-500">No matching clients found.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                {user?.role === "Admin" && <th className="p-2 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id} className="border-t">
                  <td className="p-2">{client.name}</td>
                  <td className="p-2">{client.phone}</td>
                  <td className="p-2">{client.email}</td>
                  <td className="p-2">{client.companyName}</td>
                  {user?.role === "Admin" && (
                    <td className="p-2 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/client/${client._id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

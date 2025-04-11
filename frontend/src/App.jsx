import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";
import ClientsList from "./components/ClientsList"; // You can create this later
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/clients" element={
          <ProtectedRoute>
            <ClientsList />
          </ProtectedRoute>
        } />

        <Route path="/client/new" element={
          <ProtectedRoute requiredRole="Admin">
            <AddClient />
          </ProtectedRoute>
        } />

        <Route path="/client/:id" element={
          <ProtectedRoute requiredRole="Admin">
            <EditClient />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;

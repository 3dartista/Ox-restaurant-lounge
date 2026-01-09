import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import About from "./components/About";
import AdminDashboard from "./components/AdminDashboard";
import ContactSection from "./components/ContactSection";
import Dishes from "./components/Dishes";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Mission from "./components/Mission";
import Navbar from "./components/Navbar";
import ReservationForm from "./components/ReservationForm";
import Reviews from "./components/Reviews";

/* =======================
   Simple Admin Login
======================= */
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with a real auth check
    if (password === "secret123") {
      onLogin();
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

/* =======================
   App Component
======================= */
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="relative">
        <Routes>
          {/* Public homepage */}
          <Route
            path="/"
            element={
              <main className="overflow-y-hidden text-neutral-200 antialiased">
                <HeroSection />
                <Navbar />
                <Dishes />
                <About />
                <Mission />
                <Expertise />
                <Reviews />
                <ContactSection />
                <ReservationForm />
                <Footer />
              </main>
            }
          />

          {/* Admin login */}
          <Route
            path="/admin-login-99"
            element={
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={() => setIsAdmin(true)} />
              )
            }
          />

          {/* Optional: redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Subtle admin access link */}
        <footer className="p-4 text-center">
          <Link
            to="/admin-login-99"
            className="text-xs text-gray-300 hover:text-gray-500"
          >
            Admin Access
          </Link>
        </footer>
      </div>
    </Router>
  );
};

export default App;

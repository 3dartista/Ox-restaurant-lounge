import React, { useEffect, useState } from "react";

interface Reservation {
  _id: string;
  name: string;
  email: string;
  date: string;
  guests: number;
  time: string;
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return; // only fetch if logged in

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data: Reservation[] = await res.json();
        setBookings(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Error fetching data:", err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete reservation");
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Reservation deleted successfully.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Error deleting reservation:", err);
      alert(`Error deleting reservation: ${message}`);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "secret123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // Render login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
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
  }

  // Render dashboard if authenticated
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manager's Booking Log</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Guests</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.email}</td>
                    <td className="px-4 py-3">{b.guests}</td>
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3 font-medium text-blue-600">{b.time}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

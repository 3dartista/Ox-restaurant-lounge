import React, { useState } from "react";

/* =======================
   Types
======================= */
interface Reservation {
  name: string;
  email: string;
  guests: number;
  date: string;
  time: string;
}

const ReservationForm: React.FC = () => {
  /* =======================
      State
  ======================= */
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [formData, setFormData] = useState<Reservation>({
    name: "",
    email: "",
    guests: 1,
    date: "",
    time: "",
  });

  // Helper for date validation (prevents picking past dates)
  const today = new Date().toISOString().split("T")[0];

  /* =======================
      Handlers
  ======================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value, 10) || 0 : value,

    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://ox-restaurant-lounge.onrender.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success logic
        setReservations((prev) => [...prev, formData]);
        setFormData({ name: "", email: "", guests: 1, date: "", time: "" });
        alert(`Success! Table reserved for ${formData.name}.`);
      } else {
        // Handle Zod/Backend errors (stringifying since it might be an array)
        const errorMessage = result.error ? JSON.stringify(result.error) : "Unknown error";
        alert(`Reservation failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the server. Please check if the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================
      Render
  ======================= */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        🍽️ OX & Lounge
      </h1>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        {/* Name Field */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Date Field (Essential for your backend!) */}
        <div className="mb-5">
          <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">Reservation Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={today}
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Guests and Time Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label htmlFor="guests" className="block text-sm font-bold text-gray-700 mb-2">Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              required
              min="1"
              value={formData.guests}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-bold text-gray-700 mb-2">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
            isLoading 
              ? "bg-blue-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {isLoading ? "Processing..." : "Confirm Reservation"}
        </button>
      </form>

      {/* List of local reservations */}
      <div className="mt-12 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="mr-3">📋</span> Upcoming Bookings
        </h2>
        
        {reservations.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
            No reservations found.
          </div>
        ) : (
          <ul className="space-y-4">
            {reservations.map((res, index) => (
              <li key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">{res.name}</p>
                  <p className="text-xs text-gray-500">{res.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-bold">{res.time}</p>
                  <p className="text-sm text-gray-600">{res.guests} Guests</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
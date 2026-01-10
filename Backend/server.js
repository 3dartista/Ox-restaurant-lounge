import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();

// Middleware
// Add your specific Vercel URL here
app.use(cors({
  origin: "https://ox-restaurant-lounge.vercel.app", 
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

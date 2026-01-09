import express from "express";
import { createReservation } from "../controllers/reservationController.js";
import Reservation from "../models/Reservation.js";

const router = express.Router();

/* =======================
   Routes
======================= */

// Create a new reservation
router.post("/", createReservation);

// Get all reservations
router.get("/", async (req, res) => {
  try {
    // Sort by createdAt descending so newest bookings appear first
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// Get a single reservation by ID
router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservation" });
  }
});

// Delete a reservation
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

export default router;

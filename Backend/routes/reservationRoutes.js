import express from "express";
import Reservation from "../models/Reservation.js";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/* =======================
   Routes
======================= */

// 1. CREATE Reservation & SEND Email (Combined into one)
router.post("/", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();

    // Send the email notification
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: '3dflash01@gmail.com',
      subject: 'New Reservation - OX Restaurant',
      // The backticks (`) and ${} are essential here!
      html: <p>New booking for <strong>${req.body.name}</strong> on ${req.body.date} at ${req.body.time}.</p>
    });

    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Save/Email Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// 2. GET all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// 3. GET a single reservation by ID
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

// 4. DELETE a reservation
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
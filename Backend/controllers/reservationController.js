import Reservation from "../models/Reservation.js";
import { Resend } from "resend";
import { date, z } from "zod";

const ReservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  time: z.string(),
  date: z.string(),
  guests: z.number().min(1),
});

export const createReservation = async (req, res) => {
  // We initialize this inside the function to ensure the .env is ready
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const validatedData = ReservationSchema.parse(req.body);

    const newBooking = new Reservation(validatedData);
    await newBooking.save();

    await resend.emails.send({
      from: "Restaurant <onboarding@resend.dev>",
      to: validatedData.email,
      subject: "Reservation Confirmed",
      html: `<h1>Hi ${validatedData.name}!</h1><p>Your table is booked.</p>`,
    });

    res.status(201).json({ message: "Success!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
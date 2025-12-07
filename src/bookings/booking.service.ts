import {pool} from "../config/db";

// Create a booking
export const createBooking = async (data: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

  // Check vehicle exists
  const vehicleRes = await pool.query("SELECT * FROM vehicles WHERE id = $1", [vehicle_id]);
  if (vehicleRes.rowCount === 0) throw new Error("Vehicle not found");

  const vehicle = vehicleRes.rows[0];

  // Calculate total price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const total_price = days * Number(vehicle.daily_rent_price);

  // Insert booking
  const bookingRes = await pool.query(
    `INSERT INTO bookings 
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // Update vehicle availability
  await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);

  return bookingRes.rows[0];
};

// Get bookings
export const getBookings = async (user: { id: number; role: string }) => {
  if (user.role === "admin") {
    const res = await pool.query("SELECT * FROM bookings");
    return res.rows;
  } else {
    const res = await pool.query("SELECT * FROM bookings WHERE customer_id = $1", [user.id]);
    return res.rows;
  }
};

// Update booking (Cancel/Return)
export const updateBooking = async (
  bookingId: number,
  data: { status?: string },
  user: { id: number; role: string }
) => {
  const bookingRes = await pool.query("SELECT * FROM bookings WHERE id = $1", [bookingId]);
  if (bookingRes.rowCount === 0) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];

  if (user.role !== "admin" && booking.customer_id !== user.id) {
    throw new Error("Unauthorized");
  }

  const updatedRes = await pool.query(
    `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [data.status || booking.status, bookingId]
  );

  // Make vehicle available if cancelled
  if (data.status === "cancelled") {
    await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [
      booking.vehicle_id,
    ]);
  }

  return updatedRes.rows[0];
};

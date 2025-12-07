import { pool } from "../config/db";

export interface Ivehicle {
  id?: number;
  name: string;
  type: "car" | "bike" | "van" | "suv";
  registration_number: string;
  daily_rent_price: number;
  availability_status?: "available" | "booked";
}


export const addVehicle = async (vehicle: Ivehicle) => {
  
  const result = await pool.query(
    `INSERT INTO vehicles (name, type, registration_number, daily_rent_price, availability_status)
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle.name,
      vehicle.type,
      vehicle.registration_number,
      vehicle.daily_rent_price,
      vehicle.availability_status || "available"
    ]
  );
  return result.rows[0];
};


export const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};


export const updateVehicle = async (vehicleId: number, vehicle: Ivehicle) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5, updated_at=NOW()
     WHERE id=$6 RETURNING *`,
    [
      vehicle.name,
      vehicle.type,
      vehicle.registration_number,
      vehicle.daily_rent_price,
      vehicle.availability_status || "available",
      vehicleId
    ]
  );
  return result.rows[0];
};


export const deleteVehicle = async (vehicleId: number) => {
  await pool.query(`DELETE FROM vehicles WHERE id=$1`, [vehicleId]);
};

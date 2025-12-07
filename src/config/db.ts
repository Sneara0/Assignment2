import { Pool } from "pg";
import config from ".";


export const pool = new Pool({
  connectionString: config.connection_str,
  ssl: { rejectUnauthorized: false }
});


export const initDB = async () => {
  console.log("Initializing DB...");

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15),
        age INT,
        role VARCHAR(10) DEFAULT 'customer', 
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50),
        registration_number VARCHAR(50) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10,2) NOT NULL,
        availability_status VARCHAR(20) DEFAULT 'available',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10,2),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Database initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
};

export default initDB;

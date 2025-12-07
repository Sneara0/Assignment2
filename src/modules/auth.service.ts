import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "admin" | "customer";
}


export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  );
  return result.rows[0];
};


export const createUser = async (user: IUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role`,
    [user.name, user.email.toLowerCase(), hashedPassword, user.phone, user.role || "customer"]
  );
  return result.rows[0];
};


export const verifyUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credenrials")
  }

   const token = jwt.sign(
    { id: user.id,
     role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );

  return { user, token };
};


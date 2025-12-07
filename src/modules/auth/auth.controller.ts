import { Request, Response } from "express";
import { createUser, findUserByEmail, verifyUser, IUser } from "../auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const user: IUser = await createUser({ name, email, password, phone, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await verifyUser(email, password);

    if (!result) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        token: result.token
      }
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const authController={
  signup,signin
}
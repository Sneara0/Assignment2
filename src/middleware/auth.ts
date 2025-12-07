import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface AuthRequest extends Request {
  user?: any;
}

  export const authGuard = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized – Token missing",
      });
    }

    
    const token = header.split(" ")[1];
  


    const decoded = jwt.verify(token as string, config.jwt_secret as string);

      console.log(token)
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification error:", err);

    return res.status(401).json({
      success: false,
      message: "Unauthorized – Invalid or expired token",
    });
  }
};




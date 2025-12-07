import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth";

export const adminGuard=(req:AuthRequest,res:Response,next:NextFunction)=>{

    if(!req.user){
        return res.status(401).json({
            success:false,
            message:"Unauthorized-No User info",
        })
    }


    if(req.user.role !=="admin"){
        return res.status(403).json({
            success: false,
            message:"Forbidden -Admins only"
        })

    }

    next();

}
import { Request, Response } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "./user.service";
import { AuthRequest } from "../middleware/auth";


export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const editUser = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const data = req.body;

       
        if (req.user.role !== "admin" && req.user.id !== Number(userId)) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        const updated = await updateUser(Number(userId), data);
        res.json({ success: true, data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const removeUser = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        await deleteUser(Number(userId));
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

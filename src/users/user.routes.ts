import { Router } from "express";
import { authGuard } from "../middleware/auth";
import { adminGuard } from "../middleware/adminGuard";
import { getUsers, editUser, removeUser } from "./user.controller";

const router = Router();


router.get("/", authGuard, adminGuard, getUsers);


router.put("/:userId", authGuard, editUser);
router.delete("/:userId", authGuard, adminGuard, removeUser);

export const userVehicle= router;

import { Router } from "express";
import { authGuard } from "../middleware/auth";
import { adminGuard } from "../middleware/adminGuard";
import {
  addVehicleController,
  getAllVehiclesController,
  updateVehicleController,
  deleteVehicleController,
} from "./vehicle.controller";

const router = Router();


router.post("/", authGuard, adminGuard, addVehicleController);
router.put("/:vehicleId", authGuard, adminGuard, updateVehicleController);
router.delete("/:vehicleId", authGuard, adminGuard, deleteVehicleController);

router.get("/", getAllVehiclesController);

export const vehicleRoute= router;

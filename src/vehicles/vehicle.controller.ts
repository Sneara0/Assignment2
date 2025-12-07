import { Request, Response } from "express";
import { addVehicle, getAllVehicles, Ivehicle, updateVehicle, deleteVehicle } from "./vehicle.service";


export const addVehicleController = async (req: Request, res: Response) => {
  try {
    console.log("req.body:", req.body);

    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

    const vehicle: Ivehicle = {
    name: vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status: availability_status,
    };

    const newVehicle = await addVehicle(vehicle);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: newVehicle,
    });
  } catch (err) {
    console.error("AddVehicle error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllVehiclesController = async (req: Request, res: Response) => {
  try {
    const vehicles = await getAllVehicles();
    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (err) {
    console.error("GetAllVehicles error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateVehicleController = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);
    const { name, type, registration_number, daily_rent_price, availability_status } = req.body;

    const updatedVehicle = await updateVehicle(vehicleId, {
      name,
      type,
      registration_number,
      daily_rent_price,
      availability_status: availability_status,
    });

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (err) {
    console.error("UpdateVehicle error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteVehicleController = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);

    await deleteVehicle(vehicleId);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    console.error("DeleteVehicle error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

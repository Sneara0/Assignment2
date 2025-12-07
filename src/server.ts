import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoute } from "./modules/auth/auth.routes";
import { vehicleRoute } from "./vehicles/vehicle.routes";
import { userVehicle } from "./users/user.routes";
import { bookingVehicle } from "./bookings/booking.routes";

const app=express();
app.use(express.json());

initDB()


app.use('/api/v1/auth',authRoute)
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/users", userVehicle);

app.use("/api/v1/bookings",bookingVehicle)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});

app.listen(5000, () => {
  console.log("Server is running on post 5000");
});
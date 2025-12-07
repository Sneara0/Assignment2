import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
  connection_str: process.env.CONNECTION_STR,
  port: process.env.PORT,
  jwt_secret:process.env.JWT_SECRET,
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 
  
};

export default config;

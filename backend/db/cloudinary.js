import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNERY_CLOUD_NAME,
  api_key: process.env.CLOUDNERY_API_KEY,
  api_secret: process.env.CLOUDNERY_API_SECRET,
});

// const storage = multer.memoryStorage(); // Store image in memory
// const upload = multer({ storage: storage });

export default cloudinary;

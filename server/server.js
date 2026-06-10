import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
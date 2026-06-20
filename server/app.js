import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import passport from './config/passport.js'
import limiter from './middlewares/rateLimiter.js';
import notificationRoutes from "./routes/notificationRoutes.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/',(req,res)=>{
    res.send('API is running');
});
app.use('/api/auth',limiter,authRoutes); // specific endpoint rate limiting 
app.use('/api/users',userRoutes);
app.use('/api/sessions',sessionRoutes);
app.use('/api/credits',creditRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/upload', uploadRoutes)
app.use("/api/notifications",notificationRoutes)
export default app;
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running');
});
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/sessions',sessionRoutes);
app.use('/api/credits',creditRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/upload', uploadRoutes)
export default app;
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running');
});
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/sessions',sessionRoutes);
export default app;
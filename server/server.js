import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import http from "http"
import "./config/redis.js"
import {Server} from "socket.io";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

export const io = new Server(server,{
    cors:{
        origin:[
            "http://localhost:5173",
            "https://skill-bridge-sage-three.vercel.app"
        ],
        credentials:true
    }
});

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    socket.to(roomId).emit(
      "user-joined",
      socket.id
    );

    console.log(
      `${socket.id} joined ${roomId}`
    );
  });
  socket.on(
    "offer",
    ({ roomId, offer }) => {
        console.log("Offer relayed")
      socket.to(roomId).emit(
        "offer",
        offer
      );
    }
  );
  socket.on(
    "answer",
    ({ roomId, answer }) => {
      console.log("Answer Relayed");

      socket.to(roomId).emit(
        "answer",
        answer
      );
    }
  );
  socket.on(
    "ice-candidate",
    ({
      roomId,
      candidate,
    }) => {
      console.log(
        "ICE Candidate Relayed"
      );

      socket.to(roomId).emit(
        "ice-candidate",
        candidate
      );
    }
  );
});
server.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`);
})

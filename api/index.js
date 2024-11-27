import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cors from 'cors';

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => console.log("Db is connected"))
.catch((err) => console.log(err))

const app = express();

app.listen(3000, () => {
  console.log("The server is running ")
})

// Permetti richieste solo da localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Aggiungi metodi supportati se necessario
    allowedHeaders: ['Content-Type', 'Authorization'], // Intestazioni permesse
    credentials: true,  // Permetti l'invio di credenziali (ad esempio i cookie)
}));


app.use(express.json())



app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
})
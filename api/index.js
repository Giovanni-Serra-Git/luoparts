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
  origin: "http://localhost:5173", // Permetti tutte le origini. Specifica un dominio per maggiore sicurezza.
  methods: ["GET", "POST", "DELETE", "PUT"], // Permetti solo i metodi che ti servono
  allowedHeaders: ["Content-Type", "Authorization"] // Specifica gli header permessi
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
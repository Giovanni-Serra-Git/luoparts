import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import useRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => console.log("Db is connected"))
.catch((err) => console.log(err))

const app = express();

app.use(express.json())


app.listen(3000, () => {
    console.log("The server is running ")
})


app.use("/api/user", useRoutes)
app.use("/api/auth", authRoutes)
import User from "../models/user.model.js";
import bcryptjs from "bcrypt"
import { errorHanlder } from "../utils/error.js";

export const signup = async (req,res, next) => {
    const {username, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHanlder(400, "All fields are required"))
    }

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.json("Signup Successful")
    } catch (error) {
        next(error)
    }
}
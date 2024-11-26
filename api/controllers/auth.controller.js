import User from "../models/user.model.js";
import bcryptjs from "bcrypt"

export const signup = async (req,res) => {
    const {username, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10)

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json( { message: "All field are required" })
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
        res.status(500).json({message: "Username or email already exists" || error.message})
    }
}
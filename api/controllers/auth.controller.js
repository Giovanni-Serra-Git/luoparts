import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';


export const signup = async (req,res, next) => {
    const {username, email, password} = req.body;

    const hashedPassword = jsbcryptjsjs.hashSync(password, 10)

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"))
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


export const signin = async (req,res,next) => {

    let {email,password} = req.body;


    email = email.trim()
    password = password.trim()

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({email})

        if (!validUser) {
            return next(errorHandler(400, "Invalid User or password"))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid User or password"))
        }

        const token = jwt.sign({
            userId: validUser.id,
        }, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc

        res.status(200).cookie("Access_Token", token, {
            httpOnly: true,
        }).json(rest)

        
        
    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  console.log(googlePhotoUrl)
  
  try {
      const user = await User.findOne({ email });

      console.log(user)
      
      if (user) {
          // Se l'utente esiste, crea un token JWT e invia il cookie
          const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
          const { password, ...rest } = user._doc;
          res.status(200)
              .cookie('access_token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production', // Aggiungi il flag secure in produzione
              })
              .json(rest);
      } else {
          // Se l'utente non esiste, creane uno nuovo
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = await bcryptjs.hash(generatedPassword, 10); // Usa la versione asincrona di jsbcryptjs
          const newUser = new User({
              username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
              email,
              password: hashedPassword,
              profilePicture: googlePhotoUrl,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
          const { password, ...rest } = newUser._doc;
          res.status(200)
              .cookie('access_token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
              })
              .json(rest);
      }
  } catch (error) {
      console.error('Errore durante l\'autenticazione con Google:', error);
      next(error); // Gestione globale degli errori
  }
};
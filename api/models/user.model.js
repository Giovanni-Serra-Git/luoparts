import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png',
        required: false,
      },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;
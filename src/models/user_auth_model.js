import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required:true ,trim: true },
    is_active: { type: Boolean, default: true },
},
{
    timestamps:true
})

const userModel = mongoose.model("users" , userSchema)

export default userModel ;
import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  user_id: { type: mongoose.Types.ObjectId , required: true},
  passport_number : { type: String, required: true },
  status : { type: Boolean, default:false}
},{
    timestamps:true
});

const verificationModel = mongoose.model('verification', verificationSchema);

export default verificationModel ;
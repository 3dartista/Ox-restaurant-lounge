import mongoose from "mongoose";
import { email } from "zod";

const reservationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    date:{type:String,required:true},
    guests:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
});

export default mongoose.model('Reservation',reservationSchema);
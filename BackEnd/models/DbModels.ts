import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    _id: String,
    name: String,
    nim: String,
    password: String,
    role: String,
    voted: Boolean,
    txhash: String,
    txdate: String
})

const userModel = mongoose.model('users', userSchema)

export { userModel }
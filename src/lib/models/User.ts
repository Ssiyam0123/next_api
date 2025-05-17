import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";


const userSchema = new Schema({
    email: { type: "string", required: true, unique: true },
    userName: { type: "string", required: true, unique: true },
    password: { type: "string", required: true }
}, {
    timestamps: true
})


const User = models.User || model("User", userSchema);
export default User;
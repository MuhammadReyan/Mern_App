import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Provide Unique Username"],
            unique: [true, "Username Exists"]
        },
        password: {
            type: String,
            required: [true, "Please Provide A Password"],
            unique: false
        },
        email: {
            type: String,
            required: [true, "Please Provide An Email"],
            unique: true
        },
        firstName: { type: String },
        lastName: { type: String },
        mobile: { type: Number },
        address: { type: String },
        profile: { type: String }
    },
    {
        timestamps: true // This will add createdAt and updatedAt fields
    }
);

export default mongoose.model('User', UserSchema);

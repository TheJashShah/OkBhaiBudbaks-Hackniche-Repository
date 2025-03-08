import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    fullName: String,
    age: String,
    gender: String,
    location: String,
    occupation: String,
    phoneNumber: String,
    interests: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })

const UserDetails = mongoose.model('userDetails', userSchema);
export default UserDetails;
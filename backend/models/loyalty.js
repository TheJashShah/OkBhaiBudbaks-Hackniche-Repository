import mongoose from "mongoose"

const loyaltySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
});

const Loyalty = mongoose.model("Loyalty", loyaltySchema);
export default Loyalty

import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
    { timestamps: true }
);

const Cart = mongoose.model('cart', CartSchema);
export default Cart;
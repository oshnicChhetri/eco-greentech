import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    userRole: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    userAddress: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      houseNumber: {
        type: String,
        required: true,
         // House numbers are typically positive
      },
      postalCode: {
        type: String, // Allows for alphanumeric postal codes
        required: true,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
        required: true,
      },
      
      
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;








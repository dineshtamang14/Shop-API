import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { 
      type: String, 
      required: true 
    },
    phone: {
      type: String,
      required: true
    },
    address: { 
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

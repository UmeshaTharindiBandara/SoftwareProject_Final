import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
=======
  role: { type: String, default: 'user' },
  profilePicture: { type: String },
  mobile: { type: String },
  address: { type: String }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
>>>>>>> main

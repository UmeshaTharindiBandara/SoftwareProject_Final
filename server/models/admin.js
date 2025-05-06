import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

<<<<<<< HEAD
const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;
=======
const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
>>>>>>> main

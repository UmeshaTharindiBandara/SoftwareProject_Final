import mongoose from "mongoose";

const newuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "customer" },
});

const newuserModel = mongoose.model("newusers", newuserSchema);

export default newuserModel;
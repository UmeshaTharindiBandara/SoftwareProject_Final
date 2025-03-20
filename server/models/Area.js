import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  area: { type: String, required: true },
  locations: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true }
    }
  ]
});

const Area = mongoose.model("Area", areaSchema);
export default Area;

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },  // Using _id from your data as the primary key
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String, required: true }
}, { collection: "courses" });

export default mongoose.model("Course", courseSchema);

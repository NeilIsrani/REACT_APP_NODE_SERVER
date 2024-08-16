import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },  // Unique identifier for each lesson
  name: { type: String, required: true },
  description: { type: String, required: true },
  module: { type: String, ref: "Module", required: true }  // References the module to which the lesson belongs
});

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },  
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, ref: "Course", required: true },  
  lessons: [lessonSchema]  
}, { collection: "modules" });

export default moduleSchema;

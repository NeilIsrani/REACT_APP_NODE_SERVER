import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
//   _id: { type: String, required: true, unique: true },  
  name: { type: String, required: true },
  description: { type: String, required: true },
  module: { type: String, ref: "Module", required: true }  
});

const moduleSchema = new mongoose.Schema({
//   _id: { type: String, required: true, unique: true },  
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, ref: "Course", required: true },  
  lessons: [lessonSchema]  
}, { collection: "modules" });

export default moduleSchema;
import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Modules", schema);
export default model;

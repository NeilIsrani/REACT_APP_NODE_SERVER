import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Users", schema);
export default model;

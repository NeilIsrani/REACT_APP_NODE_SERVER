import ModuleModel from "./model.js";

export const createModule = (module) => ModuleModel.create(module);
export const findModulesByCourse = (courseId) => ModuleModel.find({ course: courseId });
export const updateModule = (id, module) => ModuleModel.findByIdAndUpdate(id, module, { new: true });
export const deleteModule = (id) => ModuleModel.findByIdAndDelete(id);
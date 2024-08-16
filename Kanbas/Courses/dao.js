
import CourseModel from "./model.js";

export const createCourse = (course) => CourseModel.create(course);
export const findAllCourses = () => CourseModel.find();
export const findCourseById = (id) => CourseModel.findById(id);
export const updateCourse = (id, course) => CourseModel.findByIdAndUpdate(id, course, { new: true });
export const deleteCourse = (id) => CourseModel.findByIdAndDelete(id);

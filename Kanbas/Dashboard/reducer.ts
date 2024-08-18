import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },

    addCourse: (state, { payload: course }) => {
      const newCourse = {
        _id: new Date().getTime().toString(),
        name: course.name,
        number: "NA",
        startDate: "2023/05/12",
        endDate: "2024/05/12",
        department: "NA",
        credits: 1,
        description: "NA",
      };
      state.courses = [...state.courses, newCourse] as any;
    },

    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId
      );
    },

    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? { ...c, ...course } : c
      ) as any;
    },

    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },
  },
});

export const { setCourses, addCourse, deleteCourse, updateCourse, editCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
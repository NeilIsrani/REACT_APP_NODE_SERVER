import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your assignment and state
interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  assignmentGroup: string;
  gradeDisplay: string;
  submissionType: string;
  dueDate: string;
  availableFrom: string;
  until: string;
  course: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

// Initial state with type
const initialState: AssignmentsState = {
  assignments: [],
};

// Create slice with typed state and actions
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<{ assignments: Assignment[] }>) => {
      state.assignments = action.payload.assignments;
    },

    addAssignment: (state, action: PayloadAction<{ assignment: Assignment; course: any }>) => {
      const { assignment, course } = action.payload;
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        description: course.description,
        points: assignment.points,
        assignmentGroup: assignment.assignmentGroup,
        gradeDisplay: assignment.gradeDisplay,
        submissionType: assignment.submissionType,
        dueDate: course.dueDate,
        availableFrom: course.availableFrom,
        until: assignment.until,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },

    updateAssignment: (state, action: PayloadAction<{ assignment: Assignment; course: any }>) => {
      const { assignment, course } = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? { ...assignment, description: course.description, dueDate: course.dueDate, availableFrom: course.availableFrom } : a
      );

      // Also update the course information if needed
      //state.courses = state.courses.map((c) =>
      //  c._id === course._id ? { ...c, ...course } : c
      //);
    },

    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import dashboardReducer from "./Dashboard/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    dashboardReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
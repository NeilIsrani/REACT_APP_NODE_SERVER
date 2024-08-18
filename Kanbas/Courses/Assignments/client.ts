import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios
    .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axios.post( `${COURSES_API}/${courseId}/assignments`, assignment);
    console.log("Update Assignment Response: ", response);
    return response.data;
  };
  
  export const findCourse = async (courseId: string) => {
    try {
      const response = await axios.get(`${COURSES_API}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  };
export const findAssignmentsForCourse = async (courseId: string) => {
  console.log(ASSIGNMENTS_API);
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  console.log("Update Assignment Response: ", response);
  return response.data;
};
export const updateAssignment = async (assignment: any) => {
    const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    console.log("Update Assignment Response: ", response);
    return response.data;
  };

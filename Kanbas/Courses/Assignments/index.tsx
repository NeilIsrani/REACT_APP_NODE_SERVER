import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store';
import { deleteAssignment, setAssignments, addAssignment, updateAssignment } from './reducer';
import * as client from './client';  
import { fetchAllCourses } from "../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // Fetch assignments from the API and dispatch them to the Redux store
  const fetchAssignments = async () => {
    try {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      console.log("API Response: ", assignments);
      dispatch(setAssignments({ assignments })); // Adjust according to your state structure
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  // const fetchCourse = async () => {
  //   try {
  //     const courses = await client.findCourse(cid as string);
  //     const assignments = await client.findAssignmentsForCourse(cid as string);
  //     console.log("API Response2: ", courses);
  //      // Adjust according to your state structure
  //   } catch (error) {
  //     console.error("Failed to fetch course:", error);
  //   }
  // };



  // Remove an existing assignment
  const removeAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  // Update an existing assignment
  

  useEffect(() => {
    fetchAssignments();
    fetchAllCourses();
    //console.log("Assignments State:", assignments);
  }, [cid]);

  // Select assignments and courses from the Redux store
  const assignments = useSelector((state: RootState) => state.assignmentsReducer?.assignments);// make this variable always be all the courses
  
  // Filter assignments based on the course ID
  const courseAssignments = assignments.filter(assignment => assignment.course === cid);
  
  // Find the current course from the list of courses
  //const course = courses.find(course => course._id === cid);

  if (!courseAssignments) {
    return <div>Course not found</div>;
  }

  // Handle deletion of an assignment
  function handleDelete(_id: string): void {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      removeAssignment(_id);
    }
  }

  return (
    <div id="wd-assignments">
      <button id="wd-search-bar" className="btn btn-lg wd-search-bar col-8" type="button">
        <SearchBar />
      </button>
      <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary">+ Group</button>
      <button id="wd-add-assignment" className="btn btn-lg btn-danger">
        <div>
          <Link to={`/Kanbas/Courses/${cid}/Assignments/New`} className="btn btn-danger">+ Assignment</Link>
        </div>
      </button>
      <div className="wd-margin-assignment-box bg-secondary p-3">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="fs-3" /> <span className="smallspace"></span>
          ASSIGNMENTS <span className="space"></span><span className="smallspace"></span> <span className="space"></span> 40% of Total +
          <span className="smallspace"></span>
          <IoEllipsisVertical className="fs-4" />
        </h3>
      </div>
      <div id="wd-assignment-list">
        <div className="assignment-container">
          {courseAssignments.map(assignment => (
            <div className="wd-assignment-list-item" key={assignment._id}>
              <div className="assignment-header">
                <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                  <BsGripVertical className="fs-3" /> <span className="smallspace"></span>
                  <FaList /> <span className="smallspace"></span>
                  <strong>{assignment.title}</strong><span className="space"></span><span className="space"></span><span className="space"></span>
                  <IoEllipsisVertical className="fs-4" />
                </a>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="btn btn-danger btn-sm delete-btn">Delete</button>
              </div>
              <div>
                <span className="red-text">Multiple Modules</span> | <strong>Not available until</strong> {assignment.availableFrom} | <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

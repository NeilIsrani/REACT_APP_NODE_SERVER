import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, setCourses, updateCourse } from "./reducer";
import * as client from "../Courses/client";
import { RootState } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.dashboardReducer.courses);
  
  // State for the course form
  const [course, setCourse] = useState({ name: "", description: "" });

  const fetchAndDispatchCourses = async () => {
    try {
      const data = await client.fetchAllCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
  
  useEffect(() => {
    // Call the external function when the component mounts
    fetchAndDispatchCourses();
  }, [dispatch]);

  const addNewCourse = async () => {
    try {
      const newCourse = { ...course, 
        number: "NA",
        startDate: "2023/05/12",
        endDate: "2024/05/12",
        department: "NA",
        credits: 1, 
      };
      const createdCourse = await client.createCourse(newCourse);
      dispatch(addCourse(createdCourse));
      setCourse({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const updatedCourse = await client.updateCourse(course);
      dispatch(updateCourse(updatedCourse));
      setCourse({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">
            Dashboard 
          </h1>
            <h5>
              New Course
              <button
                className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </button>
              <button
                className="btn btn-warning float-end me-2"
                onClick={handleUpdateCourse}
                id="wd-update-course-click"
              >
                Update
              </button>
              <input
                value={course.name}
                className="form-control mb-2"
                onChange={(e) =>
                  setCourse({ ...course, name: e.target.value })
                }
                placeholder="Course Name"
              />
              <textarea
                value={course.description}
                className="form-control"
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                placeholder="Course Description"
              />
            </h5>
          <hr />
          <hr />
          <h2 id="wd-dashboard-published">
            Published Courses ({courses.length})
          </h2>
          <hr />
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {courses.map((course: any) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "340px" }}
                  key={course._id}
                >
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="text-decoration-none"
                  >
                    <div className="card rounded-3 overflow-hidden">
                      <img src="/images/reactjs.webp" height="160" />
                      <div className="card-body">
                        <span
                          className="wd-dashboard-course-link"
                          style={{
                            textDecoration: "none",
                            color: "navy",
                            fontWeight: "bold",
                          }}
                        >
                          {course.name}
                        </span>
                        <p
                          className="wd-dashboard-course-title card-text"
                          style={{ maxHeight: 53, overflow: "hidden" }}
                        >
                          {course.description}
                        </p>
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="btn btn-primary"
                        >
                          Go
                        </Link>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleDeleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

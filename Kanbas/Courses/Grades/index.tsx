import React from 'react';
import { useParams } from 'react-router-dom';
import { SearchBar } from "./SearchBar";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as db from "../../Database";

export default function Grades() {
  const { cid } = useParams(); // Get the courseId from route params

  // Filter assignments based on the courseId
  const assignments = db.assignments.filter(assignment => assignment.course === cid);

  // Filter enrollments to get enrolled user IDs for the selected course
  const enrolledUserIds = db.enrollments
    .filter(enrollment => enrollment.course === cid)
    .map(enrollment => enrollment.user);

  // Filter users based on the enrolled user IDs
  const enrolledUsers = db.users.filter(user => enrolledUserIds.includes(user._id));

  // Helper function to get the grade for a specific student and assignment
  const getGrade = (studentId: string, assignmentId: string) => {
    const gradeEntry = db.grades.find(grade => grade.student === studentId && grade.assignment === assignmentId);
    return gradeEntry ? `${gradeEntry.grade}%` : 'N/A';
  };

  // Helper function to get the student's full name
  const getStudentName = (studentId: string) => {
    const student = db.users.find(user => user._id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  return (
    <div id="wd-assignments" className="container">
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-end">
          <button id="wd-add-import" className="btn btn-lg btn-secondary me-2">
            <BsArrowBarDown /> Import
          </button>
          <div className="dropdown">
            <button 
              id="wd-add-export" 
              className="btn btn-lg btn-secondary dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
              <BsArrowBarUp /> Export
            </button>
            <ul className="dropdown-menu" aria-labelledby="wd-add-export">
              <li>
                <button className="dropdown-item">
                  <BsArrowBarUp /> Export
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="search-student-names" className="form-label"><strong>Student Names</strong></label>
          <SearchBar />
        </div>
        <div className="col-md-6">
          <label htmlFor="search-assignment-names" className="form-label"><strong>Assignment Names</strong></label>
          <SearchBar />
        </div>
      </div>

      <h2 className="mt-4">Grades</h2>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th>Student Name</th>
            {assignments.map(assignment => (
              <th key={assignment._id}>{assignment.title} (Out of 100)</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? "table-white" : "table-secondary"}>
              <td>{getStudentName(user._id)}</td>
              {assignments.map(assignment => (
                <td key={assignment._id}>{getGrade(user._id, assignment._id)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

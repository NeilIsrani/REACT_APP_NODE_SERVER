
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useNavigate } from 'react-router-dom';   

import * as db from '../../Database';
import { useDispatch, useSelector } from 'react-redux';
// Import your action creators
import { setAssignments, addAssignment, updateAssignment } from './reducer';
import * as client from './client';
import { RootState } from '../../store';

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get both course and assignment IDs from params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: RootState) => state.assignmentsReducer.assignments);

  const assignment = aid && aid !== 'New' ? assignments.find((assignment: { _id: string; }) => assignment._id === aid) : null;
  //const courses = useSelector((state: RootState) => state.assignmentsReducer.courses);
  //const course = courses.find(course => course._id === cid);

  // State for the assignment form
  const [_id, set_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(100);
  const [assignmentGroup, setAssignmentGroup] = useState('ASSIGNMENTS');
  const [gradeDisplay, setGradeDisplay] = useState('Percentage');
  const [submissionType, setSubmissionType] = useState('Online');
  const [dueDate, setDueDate] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [until, setUntil] = useState('');
  const [course, setCourse] = useState(cid);
 

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setPoints(assignment.points);
      setAssignmentGroup('ASSIGNMENTS');
      setGradeDisplay('Percentage');
      setSubmissionType('Online');
      setDescription(assignment.description || "new course"); // Use default description if not provided
      setDueDate(assignment.dueDate);
      setAvailableFrom(assignment.availableFrom);
      setUntil(assignment.until);
      setCourse(assignment.course)
    }
  }, [assignment]);

  const handleSave = async () => {
    // Prepare the assignment object with default values for missing parameters
    const assignmentData = {
      _id: aid !== 'New' ? assignment?._id : `new-${Date.now()}`, // Generate a unique ID for the new assignment if it's new
      title: title || "",
      description: description || "",
      points: points || 0,
      assignmentGroup: assignmentGroup || "ASSIGNMENTS",
      gradeDisplay: gradeDisplay || "Percentage",
      submissionType: submissionType || "Online",
      dueDate: dueDate || "",
      availableFrom: availableFrom || "",
      until: until || "",
      course: course || cid, 
    };

    try {
      if (aid !== 'New') {
        console.log("wot", aid);
        // Update existing assignment
        await client.updateAssignment({
          ...assignmentData,
        });
      } else {
        // Create new assignment
        await client.createAssignment(cid as string, assignmentData);

      
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`); 
     
    } catch (error) {
      console.error("Failed to save assignment:", error);
    }
  };
  


  return (
    <div id="wd-assignments-editor" className="p-3 bg-white border rounded">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea
          id="wd-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows={3}
        />
      </div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-4 text-end">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-8">
            <input
              id="wd-ppoints"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <label htmlFor="wd-Assignment-Group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-8">
            <select
              id="wd-Assignment-Group"
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
              className="form-control"
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              {/* Add more options if needed */}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <label htmlFor="wd-Grade" className="form-label">Display Grade as</label>
          </div>
          <div className="col-8">
            <select
              id="wd-Grade"
              value={gradeDisplay}
              onChange={(e) => setGradeDisplay(e.target.value)}
              className="form-control"
            >
              <option value="Percentage">Percentage</option>
              {/* Add more options if needed */}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <label htmlFor="wd-SubmissionType" className="form-label">Submission Type</label>
          </div>
          <div className="col-8">
            <select
              id="wd-SubmissionType"
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value)}
              className="form-control"
            >
              <option value="Online">Online</option>
              {/* Add more options if needed */}
            </select>
            <label htmlFor="wd-select-entry" className="form-label mb-0">Online Entry Options</label>
            <div id="wd-select-entry">
              <div className="form-check">
                <input type="radio" id="text-entry" name="entry-option" value="Text Entry" className="form-check-input" />
                <label htmlFor="text-entry" className="form-check-label">Text Entry</label>
              </div>
              <div className="form-check">
                <input type="radio" id="website-url" name="entry-option" value="Website URL" className="form-check-input" />
                <label htmlFor="website-url" className="form-check-label">Website URL</label>
              </div>
              <div className="form-check">
                <input type="radio" id="media-recording" name="entry-option" value="Media Recording" className="form-check-input" />
                <label htmlFor="media-recording" className="form-check-label">Media Recording</label>
              </div>
              <div className="form-check">
                <input type="radio" id="student-annotation" name="entry-option" value="Student Annotation" className="form-check-input" />
                <label htmlFor="student-annotation" className="form-check-label">Student Annotation</label>
              </div>
              <div className="form-check">
                <input type="radio" id="file-uploads" name="entry-option" value="File Uploads" className="form-check-input" />
                <label htmlFor="file-uploads" className="form-check-label">File Uploads</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <label htmlFor="wd-Assign" className="form-label">Assign</label>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="wd-date" className="form-label">Due</label>
                    <input type="date" id="wd-date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input type="date" id="wd-available-from" className="form-control" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="wd-until" className="form-label">Until</label>
                    <input type="date" id="wd-until" className="form-control" value={until} onChange={(e) => setUntil(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary">Cancel</Link>
          </div>
          <div className="col-6 text-end">
            <button onClick={handleSave} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

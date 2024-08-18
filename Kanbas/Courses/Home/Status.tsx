import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaFileImport, FaFileDownload, FaRegFileAlt, FaBell } from "react-icons/fa";
import { BiGlobe, BiAnalyse } from "react-icons/bi";
import { AiOutlineNotification } from "react-icons/ai";
import React from "react";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px"}}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-start">
            <MdDoNotDisturbAlt className="me-2 fs-5" />
            Unpublish
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </button>
        </div>
      </div>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaFileImport className="me-2 fs-5" />
        Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaFileDownload className="me-2 fs-5" />
        Import from Commons
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiGlobe className="me-2 fs-5" />
        Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaRegFileAlt className="me-2 fs-5" />
        View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBell className="me-2 fs-5" />
        New Announcements
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiAnalyse className="me-2 fs-5" />
        New Analytics
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiOutlineNotification className="me-2 fs-5" />
        View Course Notifications
      </button>
    </div>
  );
}

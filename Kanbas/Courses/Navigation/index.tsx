import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../../Database";


export default function CourseNavigation() {
  const { cid } = useParams();
  const location = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 course-navigation">
      {links.map((link) => (
        <Link
          key={link}
          className={`list-group-item border border-0 ${location.pathname.includes(link) ? "active" : "text-danger"}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          to={`/Kanbas/Courses/${cid}/${link}`}
        >
          {link}
        </Link>
        
      ))}
    </div>
  );
}

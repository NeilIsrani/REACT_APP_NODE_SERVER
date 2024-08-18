import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchIcon() {
  return (
    <span className="me-1 position-relative">
      <FaSearch style={{ top: "-10px", left: "-8px" }}
        className="text-secondary me-1 position-absolute fs-5" />
    </span>
  );
}
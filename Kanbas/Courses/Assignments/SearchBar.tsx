import React from "react";
import SearchIcon from "./SearchIcon";
export function SearchBar() {
    return (
      <div className="input-group wd-search-bar">
        <span className="input-group-text" id="basic-addon1">
          <SearchIcon />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search... "
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
    );
  }
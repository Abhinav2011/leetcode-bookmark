import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Sort = ({
  handleSort,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSort}>
          Newest to Oldest
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSort}>
          Oldest to Newest
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;

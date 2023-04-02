import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Sort = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => console.log('clicked')}>Newest to Oldest</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('clicked')}>Oldest to Newest</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;

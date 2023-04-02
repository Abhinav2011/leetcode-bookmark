import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
      />
    </div>
  );
};

export default Loading;

import React from "react";
import { Card, Button } from "react-bootstrap";

const SingleBookmark = ({ bookmark }) => {
  const { title, url, category, timestamp } = bookmark;
  const date = new Date(timestamp.seconds * 1000);

  const redirectToLeetcode = () => {
    window.open(url, "_blank");
  };

  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>Go to leetcode to view this bookmark</Card.Title>
        <Card.Text>{`Saved on ${date}`}</Card.Text>
        <Button variant="primary" onClick={redirectToLeetcode}>
          View
        </Button>

        <Button variant="danger">Danger</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleBookmark;

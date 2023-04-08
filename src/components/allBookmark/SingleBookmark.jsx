import React from "react";
import { Card, Button } from "react-bootstrap";
import { deleteUserBookmark } from "../../../utils/getUserDataFromFirestore";
import { auth, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const SingleBookmark = ({ bookmark }) => {
  const { title, url, category, timestamp } = bookmark;
  const date = new Date(timestamp.seconds * 1000);
  const [user] = useAuthState(auth);

  const redirectToLeetcode = () => {
    window.open(url, "_blank");
  };
  const deleteBookmark = () => {
    console.log(bookmark.id);
    deleteUserBookmark(user,bookmark);
    window.location.reload();
  }
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>{`Category - ${bookmark.category}`}</Card.Title>
        <Card.Text>{`Saved on ${date}`}</Card.Text>
        <Button variant="primary" onClick={redirectToLeetcode}>
          View
        </Button>
        <Button variant="danger" onClick={deleteBookmark}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleBookmark;

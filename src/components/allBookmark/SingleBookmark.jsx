import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
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
    deleteUserBookmark(user, bookmark);
    window.location.reload();
  };
  return (
    <Card className="bookmark-card">
      <Card.Header className="bookmark-card-title">{title}</Card.Header>
      <Card.Body>
        <Card.Title>{`Category - ${bookmark.category}`}</Card.Title>
        <Card.Text>{`Saved on ${date}`}</Card.Text>
        <div className="bookmark-buttons">
          <Button className="bookmark-view" variant="primary" onClick={redirectToLeetcode}>
            View
          </Button>
          <Button className="bookmark-delete" variant="danger" onClick={deleteBookmark}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleBookmark;

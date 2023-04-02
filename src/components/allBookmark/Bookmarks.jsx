import React from "react";
import SingleBookmark from "../allBookmark/SingleBookmark";
import { Container, Row, Col } from "react-bootstrap";

const Bookmarks = ({bookmarks}) => {

  return (
    <Container>
        {bookmarks.map((bookmark,index) => {
          return (
            <Row key={index}>
              <Col>
                <SingleBookmark bookmark={bookmark}/>
                <br/>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default Bookmarks;

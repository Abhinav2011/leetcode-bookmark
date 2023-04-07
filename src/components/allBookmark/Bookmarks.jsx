import React from "react";
import SingleBookmark from "../allBookmark/SingleBookmark";
import Loading from "../loader/Loading";
import { Container, Row, Col} from "react-bootstrap";

const Bookmarks = ({ bookmarks, loading }) => {
  return (
    <Container>
      {!loading ? (
        bookmarks.map((bookmark, index) => {
          return (
            <Row key={index}>
              <Col>
                <SingleBookmark bookmark={bookmark} />
                <br />
              </Col>
            </Row>
          );
        })
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Bookmarks;

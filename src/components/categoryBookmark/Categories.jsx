import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import madrid from "../../assets/madrid.svg";

const allCategories = [
  { id: "1", name: "Interview Question" },
  { id: "2", name: "Interview Experience" },
  { id: "3", name: "Compensation" },
  { id: "4", name: "Career Guide" },
  { id: "5", name: "Study Guide" },
  { id: "6", name: "General Discussion" },
];

const Categories = ({bookmarks,headerComponent}) => {
  return (
    <>
      <h1>Bookmarks By Categories</h1>
      <Row xs={1} md={3} className="g-4">
        {allCategories.map((category, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={madrid} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Link to={"/homepage/category/"+ parseInt(idx + 1)}>
                  <Button variant="primary" onClick={() => console.log("clicked")}>
                    View
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Categories;

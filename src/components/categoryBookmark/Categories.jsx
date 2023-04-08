import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import madrid from "../../assets/madrid.svg";
import questions from "../../assets/questions.svg";

const allCategories = [
  { id: "1", name: "Interview Question",image:questions },
  { id: "2", name: "Interview Experience",image:questions },
  { id: "3", name: "Compensation",image:questions },
  { id: "4", name: "Career Guide",image:questions },
  { id: "5", name: "Study Guide",image:questions },
  { id: "6", name: "General Discussion",image:questions },
];

const Categories = ({bookmarks,headerComponent}) => {
  return (
    <>
      <h1>Bookmarks By Categories</h1>
      <Row xs={1} md={3} className="g-6">
        {allCategories.map((category, idx) => (
          <Col key={idx}>
            <Card fluid>
              {/* <Card.Img variant="top" src={category.image} /> */}
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

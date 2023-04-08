import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import questions from "../../assets/questions.svg";


const allCategories = [
  { id: "1", name: "interview-question",image:questions },
  { id: "2", name: "interview-experience",image:questions },
  { id: "3", name: "compensation",image:questions },
  { id: "4", name: "career-guide",image:questions },
  { id: "5", name: "study-guide",image:questions },
  { id: "6", name: "general-discussion",image:questions },
];

const Categories = () => {
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
                <Link to={"/homepage/category/"+ (allCategories[idx].name)}>
                  <Button variant="primary">
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

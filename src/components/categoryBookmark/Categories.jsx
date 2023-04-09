import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import questions from "../../assets/questions.svg";

const allCategories = [
  { id: "1", name: "Interview Question", image: questions },
  { id: "2", name: "Interview Experience", image: questions },
  { id: "3", name: "Compensation", image: questions },
  { id: "4", name: "Career Guide", image: questions },
  { id: "5", name: "Study Guide", image: questions },
  { id: "6", name: "General Discussion", image: questions },
];

const Categories = () => {
  const parseCategoryName = (text) => {
    const newText = text.toLowerCase().replace(/\s+/g, '-');
    return newText;
  }
  return (
    <div className="category">
      <div className="category-title">
        <p className="category-title">Bookmarks By Categories</p>
      </div>
      <Row xs={1} md={3} className="g-6">
        {allCategories.map((category, idx) => (
          <Col key={idx}>
            <Card className="category-card">
              <Card.Body>
                <Card.Title className="category-card-title">{category.name}</Card.Title>
                <Link to={"/homepage/category/" + parseCategoryName(allCategories[idx].name)}>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;

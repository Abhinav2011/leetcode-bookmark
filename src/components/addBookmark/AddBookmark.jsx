import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUserProfile,setUserBookmark} from "../../getUserDataFromFirestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const AddBookmark = () => {
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [bookmarkTitle,setBookmarkTitle] = useState("");
  const [bookmarkUrl,setBookmarkUrl] = useState("");
  const [bookmarkCategory,setBookmarkCategory] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    let tempUserUrl = await fetchUserProfile(user);
    setUserProfilePhoto(tempUserUrl);
  };

  const handleFormSubmit = (event) => {

    event.preventDefault();
    const bookmark = {
      id: uuidv4(),
      title:bookmarkTitle,
      url:bookmarkUrl,
      category:bookmarkCategory,
      timestamp: new Date()
    }
    setUserBookmark(user,bookmark);
    navigate("/homepage");
  };

  const handleTitleChange = (event) => {
    setBookmarkTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBookmarkUrl(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setBookmarkCategory(event.target.value)
  }


  useEffect(() => {
    fetchData();
  }, [user]);

  console.log(userProfilePhoto);
  return (
    <>
      <Header userProfilePhoto={userProfilePhoto} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" onChange={handleTitleChange}/>
          <Form.Text className="text-muted" ></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter Category" onChange={handleCategoryChange}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Leetcode Article Url</Form.Label>
          <Form.Control type="text" placeholder="Enter URL" onChange={handleUrlChange}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddBookmark;

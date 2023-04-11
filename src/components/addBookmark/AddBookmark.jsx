import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { auth, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchUserProfile,
  setUserBookmark,
  searchBookmark,
} from "../../../utils/getUserDataFromFirestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBookmark = () => {
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [bookmarkCategory, setBookmarkCategory] = useState("");
  const navigate = useNavigate();

  const notifyIfBookmarkPresent = () =>
    toast("This article is already present");

  const fetchData = async () => {
    let tempUserUrl = await fetchUserProfile(user);
    setUserProfilePhoto(tempUserUrl);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const bookmark = {
      id: uuidv4(),
      title: bookmarkTitle,
      url: bookmarkUrl,
      category: bookmarkCategory,
      timestamp: new Date(),
    };
    const bookmarkPresent = await searchBookmark(user, bookmark);
    if (bookmarkPresent) {
      notifyIfBookmarkPresent();
    } else {
      setUserBookmark(user, bookmark);
      navigate("/homepage");
    }
  };

  const handleTitleChange = (event) => {
    setBookmarkTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setBookmarkUrl(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setBookmarkCategory(event.target.value);
  };

  useEffect(() => {
    //this function will fecth user profile photo URL only
    fetchData();

    //If user is redirected from leetcode, get the url for search params
    const params = new URLSearchParams(location.search);
    const currUrl = params.get("url");
    if (!currUrl) {
      return;
    }
    const currTitle = currUrl.split("/")[6];
    const currCategory = currUrl.split("/")[4];
    setBookmarkUrl(currUrl);
    setBookmarkTitle(currTitle);
    setBookmarkCategory(currCategory);
  }, [user]);

  return (
    <div className="add-bookmark">
      <ToastContainer />
      <Header userProfilePhoto={userProfilePhoto} />
      <h1 className="add-page-title">
        Add &nbsp;<span className="highlight"> Bookmark</span>
      </h1>
      <Card className="add-card">
        <Form className="add-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="add-form-name">Title</Form.Label>
            <Form.Control
              className="text-input"
              type="text"
              placeholder="Enter Title"
              onChange={handleTitleChange}
              defaultValue={bookmarkTitle}
            />
            <Form.Text className="text-muted text-input"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="add-form-name">Category</Form.Label>
            <Form.Control
              className="text-input"
              type="text"
              placeholder="Enter Category"
              onChange={handleCategoryChange}
              defaultValue={bookmarkCategory}
            />
            <Form.Text className="text-muted text-input"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="add-form-name">
              Leetcode Article Url
            </Form.Label>
            <Form.Control
              className="text-input"
              type="text"
              placeholder="Enter URL"
              onChange={handleUrlChange}
              defaultValue={bookmarkUrl}
            />
            <Form.Text className="text-muted text-input"></Form.Text>
          </Form.Group>
          <Button className="add-form-submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddBookmark;

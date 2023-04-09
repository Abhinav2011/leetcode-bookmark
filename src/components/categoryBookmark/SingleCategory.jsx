import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import { auth, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchUserProfile,
  fetchUserBookmarks,
} from "../../../utils/getUserDataFromFirestore";
import Bookmarks from "../allBookmark/Bookmarks";

const SingleCategory = () => {
  const { categoryName } = useParams();
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    const photoUrl = await fetchUserProfile(user);
    setUserProfilePhoto(photoUrl);
    setLoading(true);
    const userBookmarksTemp = await fetchUserBookmarks(user);
    const newData = userBookmarksTemp.filter((bookmark) => {
      return bookmark.category === categoryName;
    });
    setCategoryData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="single-category">
      <Header userProfilePhoto={userProfilePhoto} />
      <Bookmarks bookmarks={categoryData} loading={loading} />
    </div>
  );
};

export default SingleCategory;

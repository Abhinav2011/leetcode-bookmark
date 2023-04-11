import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../header/Header";
import { auth, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchUserProfile,
  fetchUserBookmarks,
} from "../../../utils/getUserDataFromFirestore";
import Bookmarks from "../allBookmark/Bookmarks";
import Search from "../search/Search";
import Sort from "../sortData/Sort";
import { Button } from "react-bootstrap";

const SingleCategory = () => {
  const { categoryName } = useParams();
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const originalData = useRef();

  const fetchData = async () => {
    const photoUrl = await fetchUserProfile(user);
    setUserProfilePhoto(photoUrl);
    setLoading(true);
    const userBookmarksTemp = await fetchUserBookmarks(user);
    const newData = userBookmarksTemp.filter((bookmark) => {
      return bookmark.category === categoryName;
    });
    setCategoryData(newData);
    originalData.current = newData;
    setLoading(false);
  };

  const handleSearchInput = (searchText) => {
    const givenText = searchText.toLowerCase();
    if (givenText.length === 0) {
      setCategoryData(originalData.current);
      return;
    }
    const newBookmarks = originalData.current.filter((bookmark) => {
      const filteredTitle = bookmark.title
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();
      return filteredTitle.indexOf(givenText) !== -1;
    });
    setCategoryData(newBookmarks);
  };

  const handleSort = () => {
    setCategoryData((prevData) => {
      const sortedData = prevData.sort((a, b) => {
        return ascending
          ? a.timestamp.seconds - b.timestamp.seconds
          : b.timestamp.seconds - a.timestamp.seconds;
      });
      setAscending(!ascending);
      return sortedData;
    });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="single-category">
      <Header userProfilePhoto={userProfilePhoto} />
      <div className="header-buttons">
        <div className="input">
          <div className="search-component">
            <Search handleSearchInput={handleSearchInput} />
          </div>
          <div className="sort-component">
            <Sort handleSort={handleSort} />
            <Link to="/homepage/add">
              <Button>Add Bookmark</Button>
            </Link>
          </div>
        </div>
        <Bookmarks bookmarks={categoryData} loading={loading} />
      </div>
    </div>
  );
};

export default SingleCategory;

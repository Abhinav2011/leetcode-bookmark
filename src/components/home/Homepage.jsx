import React, { useEffect, useState, useRef } from "react";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Bookmarks from "../allBookmark/Bookmarks";
import Header from "../header/Header";
import Categories from "../categoryBookmark/Categories";
import Search from "../search/Search";
import Sort from "../sortData/Sort";
import { fetchUserProfile,fetchUserBookmarks } from "../../getUserDataFromFirestore";

const Homepage = () => {
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [bookmarkData, setBookmarkData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const originalData = useRef();
  const navigate = useNavigate();

  //filter bookmark data when user is searching bookmarks (filter with title)
  const handleSearchInput = (searchText) => {
    const givenText = searchText.toLowerCase();
    if (givenText.length === 0) {
      setBookmarkData(originalData.current);
      return;
    }
    const newBookmarks = originalData.current.filter((bookmark) => {
      const filteredTitle = bookmark.title
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();
      return filteredTitle.indexOf(givenText) !== -1;
    });
    setBookmarkData(newBookmarks);
  };

  //sort data either to ascending or descending acc. to their timestamp
  const handleSort = () => {
    setBookmarkData((prevData) => {
      const sortedData = prevData.sort((a, b) => {
        return ascending
          ? a.timestamp.seconds - b.timestamp.seconds
          : b.timestamp.seconds - a.timestamp.seconds;
      });
      setAscending(!ascending);
      console.log(sortedData);
      return sortedData;
    });
  };

  const fetchData = async () => {
    const photoUrl = await fetchUserProfile(user);
    setUserProfilePhoto(photoUrl);
    setLoading(true);
    const userBookmarksTemp = await fetchUserBookmarks(user);
    setBookmarkData(userBookmarksTemp);
    originalData.current = userBookmarksTemp;
    setLoading(false);
  
  };

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    // }
    fetchData();
  }, [user]);

  return (
    <div>
      <Header
        userProfilePhoto={userProfilePhoto}
      />
      <Search handleSearchInput={handleSearchInput} />
      <Sort handleSort={handleSort}/>
      <Bookmarks bookmarks={bookmarkData} loading={loading} />
      <Categories
        bookmarks={bookmarkData}
        headerComponent={
          <Header
            userProfilePhoto={userProfilePhoto}
            bookmarks={bookmarkData}
            handleSearchInput={handleSearchInput}
            handleSort={handleSort}
          />
        }
      />
    </div>
  );
};

export default Homepage;

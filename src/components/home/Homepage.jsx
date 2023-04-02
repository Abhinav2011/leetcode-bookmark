import React, { useEffect, useState, useRef } from "react";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Bookmarks from "../allBookmark/Bookmarks";
import Header from "../header/Header";
import Categories from "../categoryBookmark/Categories";
import { db } from "../../firebase";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";

const Homepage = () => {
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [bookmarkData, setBookmarkData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [loading,setLoading] = useState(true);
  const originalData = useRef();
  const navigate = useNavigate();

  //filter bookmark data when user is searching bookmarks (filter with title)
  const handleSearchInput = (searchText) => {
    const givenText = searchText.toLowerCase();
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

  //fetch the user profile photo from firestore
  const fetchUserProfile = async () => {
    const querySnapshot = await getDoc(doc(db, "users", user.uid));
    const data = querySnapshot.data();
    setUserProfilePhoto(data.photoURL);
  };

  //fetch user's saved bookmarks from firestore
  const fetchUserBookmarks = async () => {
    setLoading(true);
    let userBookmarksTemp = [];
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "bookmarks")
    );
    const data = querySnapshot.docs.map((doc) => doc.data());
    data.map((singleBookmark) => {
      userBookmarksTemp.push({
        title: singleBookmark.title,
        url: singleBookmark.url,
        category: singleBookmark.category,
        timestamp: singleBookmark.timestamp,
      });
    });
    setBookmarkData(userBookmarksTemp);
    originalData.current = userBookmarksTemp;
    setLoading(false);
  };

  const fetchData = async () => {
    await fetchUserProfile();
    await fetchUserBookmarks();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    fetchData();
  }, [user]);

  return (
    <div>
      <Header
        userProfilePhoto={userProfilePhoto}
        bookmarks={bookmarkData}
        handleSearchInput={handleSearchInput}
        handleSort={handleSort}
      />
      <Bookmarks bookmarks={bookmarkData} loading={loading}/>
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

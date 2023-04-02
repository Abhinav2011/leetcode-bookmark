import React, { useEffect, useState,useRef } from "react";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Bookmarks from "../allBookmark/Bookmarks";
import Header from "../header/Header";
import Categories from "../categoryBookmark/Categories";
import { db } from "../../firebase";
import { collection, getDoc, doc,getDocs } from "firebase/firestore";

const Homepage = () => {
  const [user] = useAuthState(auth);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [bookmarkData, setBookmarkData] = useState([]);
  const originalData = useRef();
  const navigate = useNavigate();

  //filter bookmark data when user is searching bookmarks (filter with title)
  const handleSearchInput = ((searchText) => {
    const givenText = searchText.toLowerCase();
    const newBookmarks = originalData.current.filter((bookmark) => {
      const filteredTitle = bookmark.title.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return (filteredTitle.indexOf(givenText) !== -1);
    });
    setBookmarkData(newBookmarks);
  });

  //sort bookmark data from newest to oldest acc. to timestamp
  const sortNewToOld = (data) => {
    const bookmarkTempData = originalData.current;
    const sortedData = bookmarkTempData.sort((a,b) => a.timestamp - b.timestamp);
    setBookmarkData(sortedData);
  } 

  //sort bookmark data from oldest to newest acc. to timestamp
  const sortOldToNew = (data) => {
    const bookmarkTempData = originalData.current;
    const sortedData = bookmarkTempData.sort((a,b) => b.timestamp - a.timestamp);
    setBookmarkData(sortedData);
  } 

  //set bookmark data to original order
  const setOriginalDataOrder = () => {
    setBookmarkData(bookmarkData);
  }

  //fetch the user profile photo from firestore
  const fetchUserProfile = async () => {
    const querySnapshot = await getDoc(doc(db, "users", user.uid));
    const data = querySnapshot.data();
    setUserProfilePhoto(data.photoURL);
  };

  //fetch user's saved bookmarks from firestore
  const fetchUserBookmarks = async () => {
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
        timestamp: singleBookmark.timestamp
      });
    });
    setBookmarkData(userBookmarksTemp);
    originalData.current = userBookmarksTemp;
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
      <Header userProfilePhoto={userProfilePhoto} bookmarks={bookmarkData} handleSearchInput={handleSearchInput}/>

      <Bookmarks bookmarks={bookmarkData}/>
      {/* <Categories /> */}
    </div>
  );
};

export default Homepage;

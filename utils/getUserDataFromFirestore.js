import { db } from "./firebase";
import { collection, getDoc, doc, getDocs, setDoc, deleteDoc, query, where } from "firebase/firestore";

//fetch the user profile photo from firestore
const fetchUserProfile = async (user) => {
    const querySnapshot = await getDoc(doc(db, "users", user.uid));
    const data = querySnapshot.data();
    return data.photoURL;
};

//fetch user's saved bookmarks from firestore
const fetchUserBookmarks = async (user) => {
    let userBookmarksTemp = [];
    const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "bookmarks")
    );
    const data = querySnapshot.docs.map((doc) => doc.data());
    data.map((singleBookmark) => {
        userBookmarksTemp.push({
            id: singleBookmark.id,
            title: singleBookmark.title,
            url: singleBookmark.url,
            category: singleBookmark.category,
            timestamp: singleBookmark.timestamp,
        });
    });
    return userBookmarksTemp;
};

// set bookmark data to firestore
const setUserBookmark = async (user, bookmark) => {
    console.log(bookmark);
    await setDoc(
        doc(db, "users", user.uid, "bookmarks", bookmark.id), {
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        category: bookmark.category,
        timestamp: bookmark.timestamp,
    }
    )
}

//delete a user bookmark
const deleteUserBookmark = async (user, bookmark) => {
    await deleteDoc(
        doc(db, "users", user.uid, "bookmarks", bookmark.id)
    );
}

//search for a doc in firestore
const searchBookmark = async (user, bookmark) => {
    const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
    const q = query(bookmarksRef, where("title", "==", bookmark.title));
    const querySnapshot = await getDocs(q);
    let check = false;
    querySnapshot.forEach(() => {
        check = true;
    });
    return check;
}
export { fetchUserProfile, fetchUserBookmarks, setUserBookmark, deleteUserBookmark, searchBookmark };
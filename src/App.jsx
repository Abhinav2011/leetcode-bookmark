import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Homepage from "./components/home/Homepage";
import SingleCategory from "./components/categoryBookmark/SingleCategory";
import AddBookmark from "./components/addBookmark/AddBookmark";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/homepage">
            <Route index element={<Homepage />} />
            <Route path="category/:id" element={<SingleCategory />}></Route>
            <Route path="add" element={<AddBookmark />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

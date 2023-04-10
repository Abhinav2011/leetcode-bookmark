import React, { useState } from "react";
import search from "../../assets/search.svg";

const Search = ({ handleSearchInput }) => {
  const [text, setText] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
    handleSearchInput(text);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search-text"
        placeholder="Search "
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>
        <img src={search} alt="search"></img>
      </button>
    </div>
  );
};

export default Search;

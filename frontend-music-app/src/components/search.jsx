import React, { useState } from "react";
import "./search.css";

export default function Search({ username, onSearch }) {
  const [searchOption, setSearchOption] = useState("song_name");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (e) => {
    setSearchOption(e.target.value);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, searchOption); 
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-wrapper">
          <input
            className="search-text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <button type="submit" className="search-submit">
            SEARCH
          </button>
        </div>
        <div className="search-options">
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value="song_name"
              checked={searchOption === "song_name"}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by song name</div>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value="artist_name"
              checked={searchOption === "artist_name"}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by Artist</div>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value="album_name"
              checked={searchOption === "album_name"}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by Album</div>
          </div>
        </div>
      </form>
    </div>
  );
}

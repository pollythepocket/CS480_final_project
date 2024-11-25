import { useState } from "react";
import "./search.css";

export default function Search() {
  const [searchOption, setSearchOption] = useState("name");

  const handleSelect = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-wrapper">
          <input className="search-text" placeholder="Search" />
          <button type="submit" className="search-submit">SEARCH</button>
        </div>
        <div className="search-options">
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value={"name"}
              checked={"name" == searchOption}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by song name</div>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value={"artist"}
              checked={"artist" == searchOption}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by Artist</div>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="search-option"
              value={"album"}
              checked={"album" == searchOption}
              onChange={handleSelect}
            />
            <div className="radio-label">Search by Album</div>
          </div>
        </div>
      </form>
    </div>
  );
}

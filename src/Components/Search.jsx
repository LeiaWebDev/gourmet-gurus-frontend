import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/search-result?search=${searchText}`);
}
  return (
    <form className="form-search-bar" onSubmit={handleSearch}>
      <label className="label-search" htmlFor="label-search"></label>
      <input
        className="search-bar"
        name="search"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        ></input>
        <button>Search</button>
        {/* <button onClick={findResult(string.title)}>Search</button> */}
    </form>
  )
}

export default Search
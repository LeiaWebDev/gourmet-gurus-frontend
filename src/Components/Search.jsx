import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myApi from '../api/service';
import "./../styles/searchbar.css";

function Search() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([])

  useEffect(()=> {
    async function fetchWorkshops () {
      try {
        const response = await myApi.getAllWorkshops()
        setWorkshops(response.data);
      } catch (error) {
        console.log(error);
      }
      
       
    }; fetchWorkshops()

  }, [])
 

  function handleSearch(event) {
    event.preventDefault();
    const filteredWorkshops = workshops.filter((workshop)=>
    workshop.title.toLowerCase().includes(searchText.toLowerCase())
    )
    // navigate(`/search-result?search=${searchText}`);
    navigate(`/search-result`, {state : {filteredWorkshops}});
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
        <button className="btn" type='submit'>Search</button>
        {/* <button onClick={findResult(string.title)}>Search</button> */}
    </form>
  )
}

export default Search
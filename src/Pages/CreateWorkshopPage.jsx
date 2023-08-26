import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function CreateWorkshopPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [description, setDescription] = useState("");
  const [workshopPics, setWorkshopPics] = useState("");
  const [location, setLocation] = useState("");
  const [workshopMaterial, setWorkshopMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [sessionsAvailable, setSessionsAvailable] = useState("");

  const handleSubmit = () => {
    const workshopToCreate = {
      title,
      category,
      subCategory,
      duration,
      maxParticipants,
      description,
      workshopPics,
      location,
      workshopMaterial,
      price,
      teacherId,
      sessionsAvailable,
    };
    axios
      .post(`${API_URL}/api/create-workshop`, workshopToCreate)
      .then((response) => {
        console.log(response);
        const newWorkshop = response.data;
        navigate("/see-workshops");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label>Category</label>
      <select name="category" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose an option</option>
        <option value="Cooking">Cooking</option>
        <option value="Baking">Baking</option>
        <option value="Patisserie">Patisserie</option>
      </select>
      <label>Sub Category</label>
      <select
        name="subCategory"
        onChange={(e) => setSubCategory(e.target.value)}
      >
        <option value="">Choose an option</option>
        <option value="Japanese Cuisine">Japanese Cuisine</option>
        <option value="French Cuisine">French Cuisine</option>
        <option value="South American Cuisine">South American Cuisine</option>
        <option value="Chinese Cuisine">Chinese Cuisine</option>
        <option value="Italian Cuisine">Italian Cuisine</option>
      </select>
      <label>Duration</label>
      <select name="duration" onChange={(e) => setDuration(e.target.value)}>
        <option value="">Choose an option</option>
        <option value="1h">1h</option>
        <option value="2h">2h</option>
        <option value="3h">3h</option>
      </select>
      <label>Max Participants</label>
      <input
        type="number"
        name="maxParticipants"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
      ></input>
      <label>Workshop Photos</label>
      <input
        type="text"
        name="workshopPics"
        value={workshopPics}
        onChange={(e) => setWorkshopPics(e.target.value)}
      ></input>
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      ></input>
      <label>Workshop Materials</label>
      <input
        type="text"
        name="workshopMaterial"
        value={workshopMaterial}
        onChange={(e) => setWorkshopMaterial(e.target.value)}
      ></input>
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      

      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
}

export default CreateWorkshopPage;

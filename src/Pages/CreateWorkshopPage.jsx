import React, { useState } from "react";
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
  const [teacherId, setTeacherId] = useState("");
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
    axios .post(`${API_URL}/api/create-workshop`, workshopToCreate)
    .then((response) => {
    })
    .catch((error) => {
        console.log(error);
    })
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

      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
}

export default CreateWorkshopPage;

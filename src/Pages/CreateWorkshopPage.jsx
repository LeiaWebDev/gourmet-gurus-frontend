import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import './createWorkshop.css'
const API_URL = import.meta.env.VITE_API_URL;

function CreateWorkshopPage() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);
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
  const [successMessage, setSuccessMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const teacherId = user.teacherId
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
        setSuccessMessage("Workshop successfully created!");
        navigate("/see-workshops");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {successMessage && <p>{successMessage}</p>}
      <h1 className="pagetitle">Create a workshop</h1>
      <div className="create-workshop-form">
        <div>
          <label>Workshop Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Category</label>
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose an option</option>
            <option value="Cooking">Cooking</option>
            <option value="Baking">Baking</option>
            <option value="Patisserie">Patisserie</option>
          </select>
        </div>
        <div>
          <label>Sub Category</label>
          <select
            name="subCategory"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="Japanese Cuisine">Japanese Cuisine</option>
            <option value="French Cuisine">French Cuisine</option>
            <option value="South American Cuisine">
              South American Cuisine
            </option>
            <option value="Chinese Cuisine">Chinese Cuisine</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
          </select>
        </div>
        <div>
          <label>Duration</label>
          <select name="duration" onChange={(e) => setDuration(e.target.value)}>
            <option value="">Choose an option</option>
            <option value="1h">1h</option>
            <option value="2h">2h</option>
            <option value="3h">3h</option>
          </select>
        </div>

        <div>
          <label>Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            min="2"
            max="10"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          ></input>
        </div>
        <label>Description</label>
        <div>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Workshop Photos</label>
          <input
            type="file"
            name="workshopPics"
            value={workshopPics}
            onChange={(e) => setWorkshopPics(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
        <label>Workshop Materials</label>
        <div>
          <input
            type="text"
            name="workshopMaterial"
            value={workshopMaterial}
            onChange={(e) => setWorkshopMaterial(e.target.value)}
          ></input>
        </div>
        <label>Price</label>
        <div>
          <input
            type="number"
            name="price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Sessions Available</label>
          <input
            type="date"
            name="date"
            value={sessionsAvailable}
            onChange={(e) => setSessionsAvailable(e.target.value)}
          ></input>
        </div>
        <label> Teacher's Id</label>
        <input
          type="text"
          name="teacherId"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        ></input>
        <button className="submit-button" onClick={handleSubmit}>
          {" "}
          Create{" "}
        </button>
      </div>
    </>
  );
}

export default CreateWorkshopPage;

//   const [picture, setPicture] = useState("")
//   const [pictures, setPictures] = useState([])

// async function handleSubmit(e) {
//   e.preventDefault()

//   try {
//     const fd = new FormData()
//     fd.append("title", title)
//     fd.append("pictue", picture)
//     const response = await axios.post("http://localust:5005/api", fd)
//     setPictures((current)=> [...current, response.data])
//   }catch (error) {
//     console.log(error);
//   }
// }

import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import myApi from "../api/service";
import "../styles/createworkshop.css";
const API_URL = import.meta.env.VITE_API_URL;

function CreateWorkshopPage() {
  const { user } = useContext(UserContext);
  const [newWorkshop, setNewWorkshop] = useState(null);
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
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    const fd = new FormData();
    console.log(workshopPics.length);
    fd.append("title", title);
    fd.append("category", category);
    fd.append("subCategory", subCategory);
    fd.append("duration", duration);
    fd.append("maxParticipants", maxParticipants);
    fd.append("description", description);
    for (const file of workshopPics) {
      fd.append('workshopPics', file)
    }
    fd.append("location", location);
    fd.append("price", price);

    for (const [key, value] of fd.entries()) {
      console.log(key, value);
    }
    myApi
      .createWorkshop(fd)
      .then((response) => {
        const createdWorkshop = response.data;
        // setSuccessMessage("Workshop successfully created!");
        alert("Workshop successfully created!");
        setNewWorkshop(createdWorkshop);
        navigate("/see-workshops");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* {successMessage && <p>{successMessage}</p>} */}
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

        <div>
          <label>Description</label>
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
            multiple={true}
            name="workshopPics"
            id="workshopPics"
            onChange={(e) => setWorkshopPics(e.target.files)}
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
        <div>
          <label>Workshop Materials</label>
          <input
            type="text"
            name="workshopMaterial"
            value={workshopMaterial}
            onChange={(e) => setWorkshopMaterial(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          {" "}
          Create Workshop{" "}
        </button>
      </div>
    </>
  );
}

export default CreateWorkshopPage;

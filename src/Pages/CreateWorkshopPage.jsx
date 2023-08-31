import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
      fd.append("workshopPics", file);
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
    <section className="create-workshop-container">
      {/* {successMessage && <p>{successMessage}</p>} */}

      <div className="create-workshop-card">
        <h1>Create a workshop</h1>
        <div className="workshopTitleDiv">
          <label className="workshopTitle">Workshop Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="categoryTitleDiv">
          <label htmlFor="category">Category</label>
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose an option</option>
            <option value="Cooking">Cooking</option>
            <option value="Baking">Baking</option>
            <option value="Patisserie">Pastry</option>
          </select>
        </div>
        <div className="subCategoryDiv">
          <label htmlFor="subCategory">Sub Category</label>
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
        <div className="durationDiv">
          <label htmlFor="duration">Duration</label>
          <select name="duration" onChange={(e) => setDuration(e.target.value)}>
            <option value="">Choose an option</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="2.5 hours">2.5 hours</option>
            <option value="3 hours">3 hours</option>
          </select>
        </div>

        <div className="maxParticipantsDiv">
          <label htmlFor="maxParticipants">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            min="2"
            max="10"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          ></input>
        </div>

        <div className="descriptionDiv">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="workshopPicsDiv">
          <label htmlFor="workshopPhotos">Workshop Photos</label>
          <input
            type="file"
            multiple={true}
            name="workshopPics"
            id="workshopPics"
            onChange={(e) => setWorkshopPics(e.target.files)}
          ></input>
        </div>
        <div className="locationDiv">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
        <div className="workshopMaterialsDiv">
          <label htmlFor="workshopMaterials">Workshop Materials</label>
          <input
            type="text"
            name="workshopMaterial"
            value={workshopMaterial}
            onChange={(e) => setWorkshopMaterial(e.target.value)}
          ></input>
        </div>
        <div className="priceDiv">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <button className="btn">
        <Link to={"/see-workshops/"}> See my workshops </Link>
        </button>
        <button className="btn" onClick={handleSubmit}>
          {" "}
          Create Workshop{" "}
        </button>
        <button className="btn">
          {" "}
          <Link to={"/"}>Back to home</Link>{" "}
        </button>
      </div>
    </section>
  );
}

export default CreateWorkshopPage;

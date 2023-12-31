import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../api/service";
import "../styles/updateworkshop.css";

function UpdateMyWorkshopPage() {
  const { teacherId, workshopId } = useParams();

  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedSubCategory, setUpdatedSubCategory] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState("");
  const [updatedMaxParticipants, setUpdatedMaxParticipants] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedWorkshopPics, setUpdatedWorkshopPics] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedWorkshopMaterial, setUpdatedWorkshopMaterial] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedSessionsAvailable, setUpdatedSessionsAvailable] = useState("");
  const [updatedSuccessMessage, setUpdatedSuccessMessage] = useState("");

  useEffect(() => {
    myApi
      .getWorkshopById(workshopId)
      .then((response) => {
        const workshopData = response.data;
        setWorkshop(workshopData);
        setUpdatedTitle(workshopData.title);
        setUpdatedCategory(workshopData.category);
        setUpdatedSubCategory(workshopData.subCategory);
        setUpdatedDuration(workshop.duration);
        setUpdatedMaxParticipants(workshop.participants);
        setUpdatedDescription(workshop.description);
        setUpdatedWorkshopPics(workshop.workshopPics);
        setUpdatedLocation(workshop.location);
        setUpdatedWorkshopMaterial(workshop.workshopMaterial);
        setUpdatedPrice(workshop.price);
        setUpdatedSessionsAvailable(workshop.sessionsAvailable);
        // setTeacherId(workshopData.teacherId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workshopId]);

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title", updatedTitle);
    fd.append("category", updatedCategory);
    fd.append("subCategory", updatedSubCategory);
    fd.append("duration", updatedDuration);
    fd.append("maxParticipants", updatedMaxParticipants);
    fd.append("description", updatedDescription);
    fd.append("workshopPics", updatedWorkshopPics);
    fd.append("location", updatedLocation);
    fd.append("price", updatedPrice);

    myApi
      .updateWorkshopById(teacherId, workshopId, fd)
      .then((response) => {
        console.log("Workshop updated successfully:", response);
        console.log(title);
        navigate("/see-workshops");
      })
      .catch((error) => {
        console.log("Error updating workshop:", error);
      });
  };

  return (
    <div className="update-workshop-container">
      <div className="update-workshop-form">
        <h1>Update Workshop</h1>
        <div>
          <label>Workshop Title</label>
          <input
            type="text"
            name="title"
            value={updatedTitle}
            onChange={(e) => {
              setUpdatedTitle(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="Cooking">Cooking</option>
            <option value="Baking">Baking</option>
            <option value="Patisserie">Pastry Making</option>
          </select>
        </div>
        <div>
          <label>Sub Category</label>
          <select
            name="subCategory"
            value={updatedSubCategory}
            onChange={(e) => setUpdatedSubCategory(e.target.value)}
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
          <select
            name="duration"
            value={updatedDuration}
            onChange={(e) => setUpdatedDuration(e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="2.5 hours">2.5 hours</option>
            <option value="3 hours">3 hours</option>
          </select>
        </div>

        <div>
          <label>Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            min="2"
            max="10"
            value={updatedMaxParticipants}
            onChange={(e) => setUpdatedMaxParticipants(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Workshop Photos</label>
          <input
            type="file"
            multiple={true}
            name="workshopPics"
            id="workshopPics"
            onChange={(e) => setUpdatedWorkshopPics(e.target.files[0])}
          ></input>
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Workshop Materials</label>
          <input
            type="text"
            name="workshopMaterial"
            value={updatedWorkshopMaterial}
            onChange={(e) => setUpdatedWorkshopMaterial(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            min="1"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          ></input>
        </div>

        <button className="btn" onClick={handleSubmit}>
          {" "}
          Update workshop{" "}
        </button>
      </div>
    </div>
  );
}

export default UpdateMyWorkshopPage;

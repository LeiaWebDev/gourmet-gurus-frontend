import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../api/service";

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
  // const [teacherId, setTeacherId] = useState("");

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
    const updatedData = {
      title: updatedTitle,
      category: updatedCategory,
      subCategory: updatedSubCategory,
      duration: updatedDuration,
      maxParticipants: updatedMaxParticipants,
      description: updatedDescription,
      workshopPics: updatedWorkshopPics,
      location: updatedLocation,
      workshopMaterial: updatedWorkshopMaterial,
      price: updatedPrice,
      sessionsAvailable: updatedSessionsAvailable,
      // teacherId: teacherId,
    };
    myApi
      .updateWorkshopById(teacherId, workshopId, updatedData)
      .then((response) => {
        console.log("Workshop updated successfully:", response);
        navigate("/see-workshops");
      })
      .catch((error) => {
        console.log("Error updating workshop:", error);
      });
  };

  return (
    <div>
      <h1>Update Workshop</h1>
      <div className="create-workshop-form">
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
            <option value="Patisserie">Patisserie</option>
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
            name="workshopPics"
            value={updatedWorkshopPics}
            onChange={(e) => setUpdatedWorkshopPics(e.target.value)}
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

        {/* <div>
          <label>Sessions Available</label>
          <input
            type="date"
            name="date"
            value={updatedSessionsAvailable}
            onChange={(e) => setUpdatedSessionsAvailable(e.target.value)}
          ></input>
        </div> */}
        {/* <div>
          <label> Teacher's Id</label>
          <input
            type="text"
            name="teacherId"
            value={teacherId}
            readOnly
          ></input>
        </div> */}
        <button className="submit-button" onClick={handleSubmit}>
          {" "}
          Update workshop{" "}
        </button>
      </div>
    </div>
  );
}

export default UpdateMyWorkshopPage;
//   useEffect(() => {
//     myApi
//       .getWorkshopById(workshopId)
//       .then((response) => {
//         const workshopData = response.data;
//         setWorkshop(workshopData);
//         setUpdatedTitle(workshopData.title)

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [workshopId]);
//   const handleUpdate = () => {
//     const updatedData = { title: updatedTitle}

//     myApi.updateWorkshop(workshopId, updatedData)
//     .then(() => {
//         console.log("Workshop updated successfully!");
//         navigate("/see-workshops")
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//   };

//   const navigate = useNavigate();
//   const [workshop, setWorkshop] = useState({
//     title: "",
//     category: "",
//     subCategory: "",
//     duration: "",
//     maxParticipants: "",
//     description: "",
//     workshopPics: "",
//     location: "",
//     workshopMaterial: "",
//     price: "",
//     teacherId: "",
//     sessionsAvailable: "",
//   });

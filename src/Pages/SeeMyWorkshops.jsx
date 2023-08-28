import React, { useEffect, useState } from "react";
import myApi from "../api/service";
import { Link } from "react-router-dom";

function SeeMyWorkshops() {
  const [myWorkshops, setMyWorkshops] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  const teacherId = user._id;

  console.log(teacherId);
  useEffect(() => {
    myApi
      .getAllWorkshopsByTeacherId(teacherId)
      .then((response) => {
        const createdWorkshops = response.data;
        setMyWorkshops(createdWorkshops);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteWorkshop = (workshopId) => {
    myApi
      .deleteWorkshopByTeacher(teacherId, workshopId)
      .then((response) => {
        console.log("Workshop deleted successfully:", response);
        const updatedWorkshops = myWorkshops.filter(
          (workshop) => workshop.id !== workshopId
        );
        setMyWorkshops(updatedWorkshops);
      })
      .catch((error) => {
        console.log("Error deleting workshop:", error);
      });
  };

  return (
    <div>
      <h1>My Workshops</h1>
      <div>
        {myWorkshops.map((workshop) => (
          <div key={workshop._id} id="workshop-container">
            <h2>{workshop.title}</h2>
            <p>{workshop.description}</p>
            <p>{workshop.price}€</p>
            <p>{workshop.duration}</p>
            <p>{workshop.workshopMaterial}</p>
            {/* <div>  <img className="workshop-pics" src={workshop.workshopPics} /> </div> */}
            <button>
              <Link to={`/update-workshop/${workshop._id}`}>Update</Link>
            </button>
            <button onClick={() => handleDeleteWorkshop(workshop._id)}>
              {" "}
              Delete{" "}
            </button>
            <button>
              {" "}
              <Link to={`/see-sessions/${workshop._id}`}>
                See available sessions
              </Link>{" "}
            </button>
          </div>
        ))}
      </div>
       
    </div>
  );
}

export default SeeMyWorkshops;

{
  /* {myWorkshops.length === 0 ? (
  <p>No workshops created yet</p>
) : (
  <ul>
    {myWorkshops.map((workshop) => (
      <li key={workshop._id}> {workshop.title}</li>
    ))}
  </ul>
)} */
}

import React, { useEffect, useState, useContext } from "react";
import myApi from "../api/service";
import { UserContext } from "./../context/AuthContext";
import { Link } from "react-router-dom";
import {BiTime} from 'react-icons/bi' 

function SeeMyWorkshops() {
  const [myWorkshops, setMyWorkshops] = useState([]);
  const [updatedWorkshop, setUpdatedWorkshop] = useState("")
  const { user } = useContext(UserContext);
  const teacherId = user?._id;
  useEffect(() => {
    myApi
      .getAllWorkshopsByTeacherId(teacherId)
      .then((response) => {
        const createdWorkshops = response.data;
        console.log(response);
        setMyWorkshops(createdWorkshops || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleDeleteWorkshop = (workshopId) => {
    myApi
      .deleteWorkshopByTeacher(teacherId, workshopId)
      .then((response) => {
        console.log("Workshop deleted successfully:", response);
        const updatedWorkshops = myWorkshops.filter(
          (workshop) => workshop.id !== workshopId
        );
        setUpdatedWorkshop(updatedWorkshops);
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
            <p><BiTime/>{workshop.duration}</p>
            <p>{workshop.workshopMaterial}</p>
            <div className="workshop-pic">
              {" "}
              {workshop.workshopPics.map((picture) => (
                <img className="workshop-pics" src={picture} width={200} />
              ))}{" "}
            </div>
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

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
      .getWorkshopsByTeacherId(teacherId)
      .then((response) => {
        const createdWorkshops = response.data;
        setMyWorkshops(createdWorkshops);
      })
      .catch((error) => {
        console.log(error);
      });   
  }, [teacherId]);

  return (
    <div>
      <h1>My Workshops</h1>
      {myWorkshops.map((workshop) => (
        <div key={workshop._id}>
          <h2>{workshop.title}</h2>
          <p>{workshop.description}</p>
          <Link to={`/update-workshop/${workshop._id}`}>Update</Link>
        </div>
      ))}

      {/* <div key= {workshop._id}>
        <h2>{workshop.title}</h2>
        <p>{workshop.description}</p>
      </div> */}
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

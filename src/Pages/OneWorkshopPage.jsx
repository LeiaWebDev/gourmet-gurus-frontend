import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function OneWorkshopPage() {
  const [workshop, setWorkshop] = useState(null);
  const { workshopId } = useParams();

  const getOneWorkshop = useCallback(() => {
    const url = `${API_URL}/api/workshops/${workshopId}`
    console.log("Fetching from this url:", url);
    axios
      .get(url)
      .then((response) => {
        const oneWorkshop = response.data;
        console.log(oneWorkshop);
        setWorkshop(oneWorkshop);
      })
      .catch((error) => console.log(error));
  }, [workshopId]);

  useEffect(() => {
    getOneWorkshop();
  }, [workshopId]);

  return (
    <div>
      {workshop ? (
        <div>
          <h1> Workshop: {workshop.title}</h1>
          <p>{workshop.description}</p>
        </div>
      ) : (
        <div> Loading ... </div>
      )}
    </div>
  );
}

export default OneWorkshopPage;

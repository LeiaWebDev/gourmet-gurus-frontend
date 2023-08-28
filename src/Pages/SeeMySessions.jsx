import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";

function SeeMySessions() {
  const { workshopId } = useParams();
  const [sessions, setSessions] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user, workshopId);
    if (!user) return;
    myApi
      .getExistingSessions(user._id, workshopId)
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching sesssions:", error);
      });
  }, [workshopId, user]);
  console.log(sessions);
  if (!sessions) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div>
      <h1>My workshop sessions</h1>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            {" "}
            {new Intl.DateTimeFormat(undefined, {
              timeStyle: "short",
              dateStyle: "long",
            }).format(new Date(session))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeeMySessions;

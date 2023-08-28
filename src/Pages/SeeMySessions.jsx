import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";

function SeeMySessions() {
  const { workshopId } = useParams();
  const [sessions, setSessions] = useState(null);
  const [sessionsAmount, setSessionsAmount] = useState(0);
  const [sessionsAvailable, setSessionsAvailable] = useState("");
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
      {/* <p>{workshop.title}</p> */}
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

      <div>
          {/* <fieldset>
            <legend>Add a session</legend>
          </fieldset> */}
          {new Array(sessionsAmount).fill(0).map((el, index) => {
            console.log(el, index, sessionsAmount);
            const currentSession = sessionsAvailable[index];
            return (
              <div key={currentSession?.id}>
                <input
                  name="date"
                  type="datetime-local"
                  value={currentSession?.value}
                  onBlur={(e) =>
                    setSessionsAvailable([
                      ...sessionsAvailable,
                      { id: crypto.randomUUID(), value: e.target.value },
                    ])
                  }
                ></input>
                <button
                  onClick={() => {
                    console.log(currentSession);
                    setSessionsAvailable(
                      sessionsAvailable.filter(
                        (session) => session.id !== currentSession.id
                      )
                    );
                    setSessionsAmount(sessionsAmount - 1);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        <button onClick={() => setSessionsAmount(sessionsAmount + 1)}>
          Add A session
        </button>
        
        </div>
    </div>
  );
}

export default SeeMySessions;

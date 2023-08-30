import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function SeeMySessions() {
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [sessionsAmount, setSessionsAmount] = useState(0);
  const [sessionsAvailable, setSessionsAvailable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user, workshopId);
    if (!user) return;

    myApi
      .getWorkshopByTeacherId(user._id, workshopId)
      .then((response) => {
        const workshopData = response.data;
        setWorkshop(workshopData);
      })
      .catch((error) => {
        console.log("Error fetching details of this workshop:", error);
      });

    myApi
      .getExistingSessions(user._id, workshopId)
      .then((response) => {
        console.log(response);
        setSessionsAvailable(response.data);
        setSessions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching sesssions:", error);
      });
  }, [workshopId, user]);

  const handleAddSession = async () => {
    console.log("HERE ===============>", selectedDate.toISOString());
    try {
      if (!selectedDate) return;
      const formattedDate = selectedDate.toISOString();
      await myApi.addSessionToWorkshop(user._id, workshopId, formattedDate);
      console.log(user, workshopId, formattedDate);
      setSessionsAvailable([...sessionsAvailable, formattedDate]);
      setSessionsAmount(sessionsAmount + 1);
      setSelectedDate(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveSession = async (index) => {
    try {
      const updatedSessions = [...sessions];
      updatedSessions.splice(index, 1);
      setSessions(updatedSessions);

      await myApi.deleteOneWorkshopSession(workshopId, index);
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  };

  console.log(sessions);
  if (!sessions) {
    return <div className="loading">Loading...</div>;
  }
  console.log(selectedDate);
  return (
    <div>
      <h1>My workshop sessions </h1>
      <p>{workshop.title}</p>

      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            {" "}
            {new Intl.DateTimeFormat(undefined, {
              timeStyle: "short",
              dateStyle: "long",
            }).format(new Date(session))}
            <button onClick={() => handleRemoveSession(index)}> Delete </button>
          </li>
        ))}
      </ul>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label=""
          value={selectedDate}
          onChange={(value) => {
            setSelectedDate(dayjs(value));
          }}
        />
      </LocalizationProvider>

      <button
        onClick={() => {
          if (selectedDate) {
            handleAddSession(selectedDate);
            console.log(selectedDate);
            setSelectedDate(null);
          }
        }}
      >
        Add a session
      </button>
    </div>
  );
}

export default SeeMySessions;

{
  /* <div>
       
        {new Array(sessionsAmount).fill(0).map((el, index) => {
          console.log(sessionsAvailable, index);
          const currentSession = sessionsAvailable[index];
          return (
            <div key={currentSession?.id}>
              <input
                name="date"
                type="datetime-local"
                value={currentSession?.value}
                onChange={(e) =>
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
        </div> */
}

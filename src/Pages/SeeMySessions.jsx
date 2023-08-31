import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "../styles/seemysessions.css";

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
      setSessions([...sessions, formattedDate]);
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
    <div className="sessions-container">
      <div>
        <h1>My workshop sessions </h1>
      </div>

      <div className="sessions-card">
        <p>{workshop.title}</p>
        <ul>
          {sessions.map((session, index) => (
            <li key={index}>
              {" "}
              {new Intl.DateTimeFormat(undefined, {
                timeStyle: "short",
                dateStyle: "long",
              }).format(new Date(session))}
              <button
                className="btn"
                onClick={() => handleRemoveSession(index)}
              >
                {" "}
                Delete{" "}
              </button>
            </li>
          ))}
        </ul>
        <div className="date-picker">
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
            className="btn"
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
        <div className="back-button">
          <button className="btn">
            <Link to={"/see-workshops/"}> Back to my workshops </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeeMySessions;

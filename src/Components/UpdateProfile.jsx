import React from "react";
import { useContext, useState } from "react";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/updateprofile.css";

function UpdateProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [photo, setPhoto] = useState(user.photo);
  const [bio, setBio] = useState(user.bio);
  const [role, setRole] = useState(user.role);
  // const [myProfile, setMyProfile] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    myApi
      .getUserProfile(user._id)
      .then((response) => {
        const userProfile = response.data;
        console.log(response);
        // setMyProfile(userProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (firstName === "" || lastName === "") {
      setTimeout(() => {
        setError("");
      }, 3000);
      return setError("No empty fields please!");
    }
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("phone", phone);
    fd.append("photo", photo);
    fd.append("bio", bio);
    fd.append("role", role);

    myApi
      .updateUserProfile(user._id, fd)
      .then((response) => {
        const updatedProfile = response.data;
        alert("Profile successfully completed!");
        // setUser(updatedProfile);
        // setMyProfile(updatedProfile);
        setUser(updatedProfile);
        setIsProfileUpdated(true);
        setFormVisible(false);
        navigate("/create-workshop");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="update-profile-container">

    
    <div className="update-profile-card">
      {formVisible && (
        <div className="update-profile-form">
          <form id="update-profile">
            <label htmlFor="firstName"> First Name </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="phone"> Phone Number </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="photo"> Photo </label>
            <input
              type="file"
              multiple={true}
              name="photo"
              id="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <label htmlFor="bio"> Bio </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <label htmlFor="role"> I would like to be a teacher </label>
            <input
              type="checkbox"
              checked={role === "Teacher"}
              onChange={() => {
                setRole(role === "Teacher" ? "User" : "Teacher");
              }}
            />
            <p className="error">{error}</p>
            <button className="btn" onClick={handleUpdateProfile}>
              {" "}
              Update Profile{" "}
            </button>
          </form>
        </div>
      )}

      {/* <section className="userProfile"> */}
      {/* {profileUpdated && myProfile && ( */}
      <div className="user-profile">
        <h2>Teacher's Profile</h2>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p>Contact number: {user.phone}</p>
        <img className="user-photo" src={user.photo} width={200} />
        <p>{user.bio}</p>
      </div>
      {/* )} */}
    </div>
    </div>
  );
}

export default UpdateProfile;


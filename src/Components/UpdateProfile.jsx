import React from "react";
import { useContext, useState } from "react";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UpdateProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [photo, setPhoto] = useState(user.photo);
  const [bio, setBio] = useState(user.bio);
  const [role, setRole] = useState(user.role);
  const [myProfile, setMyProfile] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);
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
        navigate("/create-workshop");
        // setUser(updatedProfile);
        // setMyProfile(updatedProfile);
        setUser(updatedProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
   <>
    <section className="updateProfileSection">
      <div className="">
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
        <button className="btn" onClick={handleUpdateProfile}> Update Profile </button>
      </form>
      </div>
      </section>

      <section className="userProfile">
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
        
      </section>
    
    </>
  );
}

export default UpdateProfile;

// const [updatedFirstName, setUpdatedFirstName] = useState(user.firstName);
// const [updatedLastName, setUpdatedLastName] = useState(user.lastName);
// const [updatedPhone, setUpdatedPhone] = useState("");
// const [updatedPhoto, setUpdatedPhoto] = useState("");
// const [updatedBio, setUpdatedBio] = useState(user.bio);
// const [updatedRole, setUpdatedRole] = useState(user.role);

// useEffect(() => {
//   setUpdatedFirstName(user.firstName);
//   setUpdatedLastName(user.lastName);
//   setUpdatedPhone(user.phone);
//   setUpdatedPhoto(user.photo);
//   setUpdatedBio(user.bio);
//   setUpdatedRole(user.role);
// }, [user]);
// const updatedProfile = {
//   firstName: updatedFirstName,
//   lastName: updatedLastName,
//   phone: updatedPhone,
//   photo: updatedPhoto,
//   bio: updatedBio,
//   role: updatedRole,
// };

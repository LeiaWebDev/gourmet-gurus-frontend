import React, { useEffect } from "react";
import { useContext, useState } from "react";
import myApi from "../api/service";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState(user.bio);
  const [role, setRole] = useState(user.role);

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
  
  const handleUpdateProfile = () => {
    const fd = new FormData();
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
        setUser(updatedProfile);
        alert("Profile successfully completed!");
        navigate("/create-workshop");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
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
          name="workshopPics"
          id="workshopPics"
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
        <button onClick={handleUpdateProfile}> Update Profile </button>
      </form>
    </div>
  );
}

export default UpdateProfile;

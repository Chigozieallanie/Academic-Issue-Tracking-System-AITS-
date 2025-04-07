import React, { useState } from "react";
import Button from "../components/ui/Button";

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Your Profile</h2>

      <div className="image-upload">
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Profile Preview" />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <input type="text" placeholder="Full Name " />

      <label>Student ID:</label>
      <input type="text" placeholder="Enter Student ID" />

      <label>Registration Number:</label>
      <input type="text" placeholder="Enter Registration Number" />

      <label>College:</label>
      <select>
        <option value="">Select College</option>
      </select>

      <label>Course:</label>
      <select>
        <option value="">Select Course</option>
      </select>

      <label>Year:</label>
      <select></select>

      <label>Semester:</label>
      <select>
        <option value="">Select Semester</option>
      </select>

      <Button type="save">Save profile</Button>

      {<p className="success-message">Profile saved successfully!</p>}
    </div>
  );
}

export default Profile;

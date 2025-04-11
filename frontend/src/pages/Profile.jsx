import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed
import Button from "../components/ui/Button";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    registrationNumber: "",
    college: "",
    course: "",
    year: "",
    semester: "",
  });
  
  const [message, setMessage] = useState("");
  
  const token = localStorage.getItem("access_token"); // Assuming you store the JWT token in localStorage

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setProfileData(response.data);
        setFormData({
          fullName: response.data.username,
          studentId: response.data.student_id || "",
          registrationNumber: response.data.registration_number || "",
          college: response.data.college || "",
          course: response.data.course || "",
          year: response.data.year_of_study || "",
          semester: response.data.semester || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "/api/profile",
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

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

      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        name="fullName"
        onChange={handleChange}
      />

      {profileData.role === "student" && (
        <>
          <label>Student ID:</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={formData.studentId}
            name="studentId"
            onChange={handleChange}
          />

          <label>Registration Number:</label>
          <input
            type="text"
            placeholder="Enter Registration Number"
            value={formData.registrationNumber}
            name="registrationNumber"
            onChange={handleChange}
          />

          <label>College:</label>
          <select
            value={formData.college}
            name="college"
            onChange={handleChange}
          >
            <option value="">Select College</option>
            {/* Add options here */}
          </select>

          <label>Course:</label>
          <select
            value={formData.course}
            name="course"
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {/* Add options here */}
          </select>

          <label>Year:</label>
          <select value={formData.year} name="year" onChange={handleChange}>
            <option value="">Select Year</option>
            {/* Add options here */}
          </select>

          <label>Semester:</label>
          <select
            value={formData.semester}
            name="semester"
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            {/* Add options here */}
          </select>
        </>
      )}

      {profileData.role === "lecturer" && (
        <div>
          {/* Lecturer-specific fields */}
          <label>Department:</label>
          <input
            type="text"
            placeholder="Enter Department"
            value={formData.department || ""}
            name="department"
            onChange={handleChange}
          />
          {/* Add other fields for lecturer */}
        </div>
      )}

      {profileData.role === "registrar" && (
        <div>
          {/* Registrar-specific fields */}
          <label>Office:</label>
          <input
            type="text"
            placeholder="Enter Office"
            value={formData.office || ""}
            name="office"
            onChange={handleChange}
          />
          {/* Add other fields for registrar */}
        </div>
      )}

      <Button type="save" onClick={handleSaveProfile}>
        Save profile
      </Button>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default Profile;

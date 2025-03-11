import Button from "../components/ui/Button"

function Profile(){


    return <div className="profile-container">
    <h2>Edit Your Profile</h2>

    <label>Upload Profile Photo:</label>
    <input type="file" accept="image/*" />


    <input type="text" placeholder="Full Name "  />
 
    <label>College:</label>
    <select >
      <option value="">Select College</option>

    </select>

    <label>Course:</label>
    <select >
      <option value="">Select Course</option>
     
    </select>

    <label>Year:</label>
    <select>
  
    </select>

    <label>Semester:</label>
    <select >
      <option value="">Select Semester</option>

    </select>

  <Button type="save">Save profile </Button>
  
    {<p className="success-message">Profile saved successfully!</p>}
  </div>
}

export default Profile
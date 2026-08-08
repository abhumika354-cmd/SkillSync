import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";

import { uploadResume } from "../services/resumeService";

import "../styles/Profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    skills: "",
  });

  useEffect(() => {

    const fetchProfile = async () => {
      try {

        const res = await getProfile();

        setUser(res.data.user);

        setFormData({
          fullName: res.data.user.fullName,
          college: res.data.user.college || "",
          skills: res.data.user.skills.join(", "),
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // Save Profile
  // =========================

  const handleSave = async () => {

    try {

      const data = {
        fullName: formData.fullName,
        college: formData.college,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const res = await updateProfile(data);

      alert(res.data.message);

      setUser(res.data.user);

      setFormData({
        fullName: res.data.user.fullName,
        college: res.data.user.college || "",
        skills: res.data.user.skills.join(", "),
      });

      setEditMode(false);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Profile Update Failed"
      );

    }

  };

  // =========================
  // Upload Resume
  // =========================

  const handleResumeUpload = async () => {

    if (!resume) {
      alert("Please choose a PDF first");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("resume", resume);

      const res = await uploadResume(formData);

      alert(res.data.message);

      setUser(res.data.user);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Resume Upload Failed"
      );

    }

  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <h1>Student Profile</h1>

        {
          editMode ? (

            <>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="college"
                placeholder="College"
                value={formData.college}
                onChange={handleChange}
              />

              <input
                type="text"
                name="skills"
                placeholder="React, Node, MongoDB"
                value={formData.skills}
                onChange={handleChange}
              />

              <label>Upload Resume (PDF)</label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button onClick={handleResumeUpload}>
                Upload Resume
              </button>

              <button onClick={handleSave}>
                Save Profile
              </button>

              <button onClick={() => setEditMode(false)}>
                Cancel
              </button>

            </>

          ) : (

            <>

              <div className="profile-info">

                <p><strong>👤 Name:</strong> {user.fullName}</p>

                <p><strong>📧 Email:</strong> {user.email}</p>

                <p><strong>🎓 College:</strong> {user.college || "Not Added"}</p>

                <p>
                  <strong>💻 Skills:</strong>{" "}
                  {
                    user.skills.length > 0
                      ? user.skills.join(", ")
                      : "No Skills Added"
                  }
                </p>

                <p><strong>👨‍🎓 Role:</strong> {user.role}</p>

                {
                  user.resume && (
                    <p>
                      <a
                        href={user.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        📄 View Resume
                      </a>
                    </p>
                  )
                }

              </div>

              <button
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>

            </>

          )
        }

      </div>

    </div>
  );
}

export default Profile;
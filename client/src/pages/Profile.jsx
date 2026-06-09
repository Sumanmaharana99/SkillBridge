import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    availability: "",
    skillsTeach: "",
    skillsLearn: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");

      setFormData({
        bio: res.data.user.bio || "",
        location: res.data.user.location || "",
        availability:
          res.data.user.availability || "",
        skillsTeach:
          res.data.user.skillsTeach.join(", "),
        skillsLearn:
          res.data.user.skillsLearn.join(", "),
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        "/users/profile",
        {
          ...formData,
          skillsTeach:
            formData.skillsTeach
              .split(",")
              .map((s) => s.trim()),

          skillsLearn:
            formData.skillsLearn
              .split(",")
              .map((s) => s.trim()),
        }
      );

      alert("Profile Updated");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit}>

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={formData.availability}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="skillsTeach"
          placeholder="Skills Teach"
          value={formData.skillsTeach}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="skillsLearn"
          placeholder="Skills Learn"
          value={formData.skillsLearn}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Profile
        </button>

      </form>
    </div>
  );
}

export default Profile;
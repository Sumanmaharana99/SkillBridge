import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
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
    <div className="max-w-3xl mx-auto">
  <h1 className="text-3xl font-bold mb-6">
    My Profile
  </h1>

  <div className="bg-white p-8 rounded-xl shadow">

    <div className="mb-4">
      <label className="block mb-2 font-medium">
        Bio
      </label>

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows="4"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-medium">
        Location
      </label>

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-medium">
        Availability
      </label>

      <input
        type="text"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-medium">
        Skills I Teach
      </label>

      <input
        type="text"
        name="skillsTeach"
        value={formData.skillsTeach}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>

    <div className="mb-6">
      <label className="block mb-2 font-medium">
        Skills I Want To Learn
      </label>

      <input
        type="text"
        name="skillsLearn"
        value={formData.skillsLearn}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>

    <button
      onClick={handleSubmit}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Update Profile
    </button>

  </div>
</div>
  );
}

export default Profile;
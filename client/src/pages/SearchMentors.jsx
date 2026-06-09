import { useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
function SearchMentors() {
  const [skill, setSkill] = useState("");
  const [users, setUsers] = useState([]);

  const searchMentors = async () => {
    try {
      const res = await API.get(
        `/users/search?skill=${skill}`
      );

      setUsers(res.data.users);

    } catch (error) {
      console.log(error);
    }
  };
const bookSession = async (mentorId) => {
  try {
    const skill = prompt(
      "Which skill do you want to learn?"
    );

    const date = prompt(
      "Enter date (YYYY-MM-DD)"
    );

    const res = await API.post(
      "/sessions/book",
      {
        mentorId,
        skill,
        date,
      }
    );

    alert(
      res.data.message ||
      "Session booked successfully"
    );

  } catch (error) {
    alert(
      error.response?.data?.message
    );
  }
};

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
    Find Mentors
  </h1>

  <div className="flex gap-4 mb-8">
    <input
      type="text"
      placeholder="Search by skill..."
      value={skill}
      onChange={(e) => setSkill(e.target.value)}
      className="flex-1 border p-3 rounded-lg"
    />

    <button
      onClick={searchMentors}
      className="bg-blue-600 text-white px-6 rounded-lg"
    >
      Search
    </button>
  </div>
      <hr />

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {users.map((user) => (
    <div
      key={user._id}
      className="bg-white rounded-xl shadow p-6"
    >
      <h2 className="text-xl font-bold">
        {user.name}
      </h2>

      <p className="text-yellow-500 mt-2">
        ⭐ {user.rating}
      </p>

      <p className="text-gray-600 mt-2">
        📍 {user.location || "Not specified"}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">
          Skills Teach
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {user.skillsTeach?.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => bookSession(user._id)}
        className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Book Session
      </button>
    </div>
  ))}
</div>
    </MainLayout>
  );
}

export default SearchMentors;
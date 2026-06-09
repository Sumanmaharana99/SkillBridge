import { useState } from "react";
import API from "../api/axios";

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
    <div>
      <h1>Search Mentors</h1>

      <input
        type="text"
        placeholder="Enter Skill"
        value={skill}
        onChange={(e) =>
          setSkill(e.target.value)
        }
      />

      <button onClick={searchMentors}>
        Search
      </button>

      <hr />

{users.map((user) => (
  <div key={user._id}>
    <h3>{user.name}</h3>

    <p>Rating: {user.rating}</p>

    <p>Location: {user.location}</p>

    <p>
      Skills:
      {user.skillsTeach.join(", ")}
    </p>

    <button
      onClick={() => bookSession(user._id)}
    >
      Book Session
    </button>

    <hr />
  </div>
))}
    </div>
  );
}

export default SearchMentors;
import { useEffect, useState } from "react";
import API from "../api/axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await API.get(
        "/sessions/my-sessions"
      );

      setSessions(res.data.sessions);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Sessions</h1>

      {sessions.map((session) => (
        <div key={session._id}>
          <h3>{session.skill}</h3>

          <p>
            Status:
            {session.status}
          </p>

          <p>
            Mentor:
            {session.mentorId?.name}
          </p>

          <p>
            Learner:
            {session.learnerId?.name}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Sessions;
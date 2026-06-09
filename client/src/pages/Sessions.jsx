import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
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
  <MainLayout>
    <h1 className="text-3xl font-bold mb-6">
      My Sessions
    </h1>

    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Skill</th>
            <th className="p-4 text-left">Mentor</th>
            <th className="p-4 text-left">Learner</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              className="border-t"
            >
              <td className="p-4">
                {session.skill}
              </td>

              <td className="p-4">
                {session.mentorId?.name}
              </td>

              <td className="p-4">
                {session.learnerId?.name}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    session.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : session.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {session.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </MainLayout>
);
}

export default Sessions;
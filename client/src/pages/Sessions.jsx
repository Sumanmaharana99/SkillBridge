import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    fetchCurrentUser();
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
  const fetchCurrentUser=async()=>{
    try{
      const res = await API.get('/auth/me');
      setCurrentUser(res.data.user);
    }
    catch(error){
      console.log(error);
    }
  }

  const updateStatus= async(sessionId,status)=>{
    try{
      await API.patch(`/sessions/${sessionId}/status`,{status});
      fetchSessions();
    }
    catch(error){
      console.log(error);
      alert("Failed to update session");
    }
  }
 return (
  <MainLayout>
    <h1 className="text-3xl font-bold mb-6">
      My Sessions
    </h1>

    <div className="bg-white rounded-xl shadow overflow-hidden">
      {sessions.length === 0 ? (
    <div className="p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-700">
        No Sessions Found
      </h2>
      <p className="text-gray-500 mt-2">
        You don't have any sessions yet.
      </p>
    </div>
  ) :(
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Skill</th>
            <th className="p-4 text-left">Mentor</th>
            <th className="p-4 text-left">Learner</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
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
        : session.status === "accepted"
        ? "bg-blue-100 text-blue-700"
        : session.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {session.status}
  </span>
</td>
              <td className="p-4">

  {currentUser &&
    session.mentorId?._id === currentUser._id &&
    session.status === "pending" && (
      <button
        onClick={() =>
          updateStatus(session._id, "accepted")
        }
        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
      >
        Accept
      </button>
    )}

  {currentUser &&
    session.mentorId?._id === currentUser._id &&
    session.status === "accepted" && (
      <button
        onClick={() =>
          updateStatus(session._id, "completed")
        }
        className="bg-green-600 text-white px-3 py-1 rounded-lg"
      >
        Complete
      </button>
    )}

  {currentUser &&
    session.learnerId?._id === currentUser._id &&
    session.status === "completed" && (
      <button
        onClick={() =>
          navigate(`/reviews/${session._id}`)
        }
        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
      >
        Review
      </button>
    )}

</td>
            </tr>
          ))}
        </tbody>
      </table>
   )}
    </div>
  </MainLayout>
);
}

export default Sessions;
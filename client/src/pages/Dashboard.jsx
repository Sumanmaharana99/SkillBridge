import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user.name} 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Credits
          </h2>

          <p className="text-3xl font-bold text-blue-600">
            {user.credits}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Rating
          </h2>

          <p className="text-3xl font-bold text-yellow-500">
            ⭐ {user.rating}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Profile Completion
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {user.profileCompletion || 0}%
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">
          Skills I Teach
        </h2>

        <div className="flex flex-wrap gap-2">
          {user.skillsTeach?.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">
          Skills I Want To Learn
        </h2>

        <div className="flex flex-wrap gap-2">
          {user.skillsLearn?.map((skill) => (
            <span
              key={skill}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
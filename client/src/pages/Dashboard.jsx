import { useEffect, useState } from "react";
import API from "../api/axios";

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
    <div>
      <h1>Welcome {user.name}</h1>

      <p>Email: {user.email}</p>

      <p>Credits: {user.credits}</p>

      <p>Rating: {user.rating}</p>
    </div>
  );
}

export default Dashboard;
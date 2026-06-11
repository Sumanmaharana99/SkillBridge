import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const params = new URLSearchParams(
        window.location.search
      );

      const token = params.get("token");

console.log("TOKEN =", token);
      if (token) {
        localStorage.setItem(
          "token",
          token
        );

        try {
          const res = await API.get(
            "/auth/me"
          );
     console.log(res.data);
          login(res.data.user);

          navigate("/dashboard");

        } catch (error) {
          console.log(error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleOAuthLogin();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">
        Logging you in...
      </h2>
    </div>
  );
}

export default OAuthSuccess;
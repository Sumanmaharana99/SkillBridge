import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );
     console.log(res.data);
      localStorage.setItem(
        "token",
        res.data.token
      );

      login(res.data.user);
      
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        SkillSwap Login
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        <div className="my-4 flex items-center">
  <div className="flex-grow border-t"></div>
  <span className="mx-3 text-gray-500">
    OR
  </span>
  <div className="flex-grow border-t"></div>
</div>

<button
  type="button"
  onClick={() => {
    window.location.href =
       "https://skillbridge-k59b.onrender.com/api/auth/google";
  }}
  className="w-full border border-gray-300 p-3 rounded-lg hover:bg-gray-50"
>
  Continue with Google
</button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Don't have an account?
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 cursor-pointer ml-1"
        >
          Register
        </span>
      </p>
    </div>
  </div>
);
}

export default Login;
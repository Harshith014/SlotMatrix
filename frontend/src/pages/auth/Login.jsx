import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { login } from "../../api/auth.api";

import { saveTokens } from "../../features/auth/authService";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  //   const { setUser } = useAuth();
  const { loadProfile } = useAuth();

  const {
    register,

    handleSubmit,

    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);

      saveTokens(res.data.data);

      await loadProfile();

      toast.success("Login Successful");

      if (res.data.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow rounded p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="w-full border rounded p-3"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
          className="w-full border rounded p-3"
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

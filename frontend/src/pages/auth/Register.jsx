import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { register as registerUser } from "../../api/auth.api";

function Register() {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow rounded p-8">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          placeholder="Name"
          {...register("name", {
            required: true,
          })}
          className="w-full border rounded p-3"
        />

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
            minLength: 6,
          })}
          className="w-full border rounded p-3"
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;

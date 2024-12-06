import React, { useState } from "react";
import fetchData from "./GlobalFunction";
import "../../assets/css/tailwind.css";
interface Errors {
  email?: string;
  name?: string;
  password?: string;
  password_confirmation?: string;
}

interface RegisterFormParams {
  entity?: string;
}

export default function RegisterForm({ entity = "/user" }: RegisterFormParams) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation before calling the API
    // const validationErrors: Errors = {};

    // if (!email) validationErrors.email = "Email is required";
    // if (!name) validationErrors.name = "Name is required";
    // if (!password) validationErrors.password = "Password is required";
    // if (password !== password_confirmation)
    //   validationErrors.password_confirmation = "Passwords do not match";

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    // If no validation errors, proceed with the API call
    const [err, data] = await fetchData({
      method: "POST",
      endpoint: `${entity}/register`,
      data: { email, name, password, password_confirmation },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        alert(err);
      }
      return;
    }

    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-2 p-3 w-full border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`mt-2 p-3 w-full border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`mt-2 p-3 w-full border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Confirm Password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className={`mt-2 p-3 w-full border rounded-md ${
              errors.password_confirmation
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-500">
              {errors.password_confirmation}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

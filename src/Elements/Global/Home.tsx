import React, { useEffect, useState } from "react";
import fetchData, { MySwal } from "./GlobalFunction";
import { useNavigate } from "react-router-dom";

interface Errors {
  email?: string;
  name?: string;
  password?: string;
  password_confirmation?: string;
}

type EntityProps = {
  entitypath: string;
  apiEndpoint: string;
  entityName: string;
};

interface FormParams {
  entityProps: EntityProps;
}

export function RegisterForm({ entityProps }: FormParams) {
  const { entitypath, apiEndpoint, entityName } = entityProps;
  const navigate = useNavigate();
  useEffect(() => {
    const localtoken = localStorage.getItem(`${entityName}_token`);
    if (localtoken) {
      navigate(`${entitypath !== "/" ? entitypath : ""}/`);
    }
  }, [entityName, entitypath, navigate]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [err, data] = await fetchData({
      method: "POST",
      endpoint: `${apiEndpoint}/register`,
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

    if (data[entityName]) {
      setEmail("");
      setName("");
      setPassword("");
      setPasswordConfirmation("");
      setErrors({});

      MySwal.fire({
        title: "Registration Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`${entitypath !== "/" ? entitypath : ""}/login`);
        }
      });
    }
  };

  return (
    <FormLayout
      title="Register"
      email={email}
      setEmail={setEmail}
      name={name}
      setName={setName}
      password={password}
      setPassword={setPassword}
      password_confirmation={password_confirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      errors={errors}
      handleSubmit={handleSubmit}
      buttonText="Register"
    />
  );
}

export function LoginForm({ entityProps }: FormParams) {
  const { apiEndpoint, entitypath, entityName } = entityProps;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  useEffect(() => {
    const localtoken = localStorage.getItem(`${entityName}_token`);
    if (localtoken) {
      navigate(`${entitypath !== "/" ? entitypath : ""}/`);
    }
  }, [entityName, entitypath, navigate]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fetchDataParams: {
      method: string;
      endpoint: string;
      data: { email: string; password: string };
      headers: { "Content-Type": string };
    } = {
      method: "POST",
      endpoint: `${apiEndpoint}/login`,
      data: { email, password },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const [err, data] = await fetchData(fetchDataParams);

    if (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        alert(err);
      }
      return;
    }
    if (data.token) {
      const token = data.token;
      localStorage.setItem(`${entityName}_token`, token);
      MySwal.fire({
        title: "Login Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`${entitypath !== "/" ? entitypath : ""}/`);
      });
    }
  };

  return (
    <FormLayout
      title="Login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
      handleSubmit={handleSubmit}
      buttonText="Login"
    />
  );
}

interface FormLayoutProps {
  title: string;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password_confirmation?: string;
  setPasswordConfirmation?: React.Dispatch<React.SetStateAction<string>>;
  errors: Errors;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  password_confirmation,
  setPasswordConfirmation,
  errors,
  handleSubmit,
  buttonText,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

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
            className={`mt-2 p-3 w-full border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Name Field */}
        {setName && name !== undefined && (
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
              className={`mt-2 p-3 w-full border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>
        )}

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
            className={`mt-2 p-3 w-full border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        {setPasswordConfirmation && password_confirmation !== undefined && (
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
              className={`mt-2 p-3 w-full border rounded-md ${errors.password_confirmation
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
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export function Dashboard({ entityProps }: FormParams) {
  const { entityName, entitypath } = entityProps;
  const navigate = useNavigate();
  let newPath: string = entitypath == '/' ? '' : entitypath
  const token = localStorage.getItem(`${entityName}_token`);
  const loginPath: string = `${newPath}/login`;
  useEffect(() => {
    if (!token) {
      navigate(loginPath);
    }
  }, [loginPath, token, navigate]);
  return (
    <div>
      <h1>Welcome to {entityName} Dashboard</h1>
      {/* Your dashboard content here */}
    </div>
  )
}
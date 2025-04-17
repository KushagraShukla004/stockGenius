import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validation schema for register
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  // Form submission handler for register
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error("Registration failed:", err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground)] mb-6 text-center">Register</h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <Field
                name="name"
                type="text"
                id="name"
                className="mt-1 p-2 w-full bg-input border border-slate-200 rounded-md text-foreground placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="registerEmail"
                className="block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                id="registerEmail"
                placeholder="you@example.com"
                className="mt-1 p-2 w-full bg-input border border-slate-200 rounded-md text-foreground placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="registerPassword"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="registerPassword"
                className="mt-1 p-2 w-full bg-input border border-slate-200 rounded-md text-foreground placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-primary text-white px-4 py-2 font-bold rounded-md hover:opacity-80 transition duration-200"
            >
              {isSubmitting || loading ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-sm text-foreground text-center mt-4">
        Already have an account? Click on{" "}
        <button type="button" onClick={switchToLogin} className="text-primary underline">
          Login
        </button>{" "}
        Tab
      </p>
    </div>
  );
};

export default Register;

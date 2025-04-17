import { loginUser } from "@/store/slices/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = ({ switchToRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed: ", error);
    }
    setSubmitting(false);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Login</h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          //Form, Field, ErrorMessage from Formik
          <Form>
            <div className="mb-4">
              <label
                htmlFor="loginEmail"
                className="block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                id="loginEmail"
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
                htmlFor="loginPassword"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="loginPassword"
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
              {isSubmitting || loading ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-sm text-foreground text-center mt-4">
        Don't have an account? Click on{" "}
        <button
          type="button"
          onClick={switchToRegister}
          className="text-primary underline"
        >
          Register
        </button>{" "}
        Tab
      </p>
    </div>
  );
};

export default Login;

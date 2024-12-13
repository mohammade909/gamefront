import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../comman/Spinner";
import { signupUser, clearErrors, clearMessage } from "../../redux/authSlice";
import ErrorAlert from "../comman/ErrorAlert";
import SuccessAlert from "../comman/SuccessAlert";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Registration() {
  const [referralCode, setReferralCode] = useState(null);
  const query = useQuery();

  useEffect(() => {
    const referral = query.get("referral");
    if (referral) {
      setReferralCode(referral);
    }
  }, [query]);

  const [showPass, setShowPass] = useState(false);
  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm password is required"),
    username: Yup.string().required("Username is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (referralCode) {
        values.referralBy = referralCode;
      }
      dispatch(signupUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => {
        navigate("/user/login");
        dispatch(clearMessage());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch, message, navigate]);

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-end bg-cover bg-center"
        style={{ backgroundImage: `url('/bot1261.jpg')` }}
      >
        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form container aligned to the right with right padding */}
        <div className="relative bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-lg w-full mr-8">
          <div className="text-left">
            <Link to="/">
              <img className="h-16 w-56 mb-4" src="/bfc.png" alt="Company Logo" />
            </Link>
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="text-gray-200 mb-6">Start your journey with us today</p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="flex gap-4">
              {/* Username */}
              <div className="w-full">
                <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-2 block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Password */}
              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-3 cursor-pointer text-gray-300"
                  >
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPass ? "text" : "password"}
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full bg-gray-700 text-gray-200 rounded-md py-2 px-4 placeholder-gray-400 border border-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-2">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

         

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 text-white rounded-md py-2 px-4 hover:bg-amber-700 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-left text-gray-300">
            Already a member?{" "}
            <Link to="/user/login" className="text-white hover:text-amber-500">
              Login Here
            </Link>
          </p>
        </div>
      </div>

      {/* Error and Success Alerts */}
      {error && <ErrorAlert error={error} />}
      {message && <SuccessAlert message={message} />}
    </>
  );
}

import React, { useState, useEffect} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../comman/ErrorAlert";
import { loginUser, clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../comman/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (auth) {
      navigate(`/${auth?.role}/dashboard`);
    }
  }, [error, dispatch, auth]);

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(/bot126.jpg)` }}  // Replace with your image path
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="text-center">
            <Link to="/">
              <img className="cursor-pointer mx-auto h-16 w-56" src="/bfc.png" alt="Your Company" />
            </Link>
            <h2 className="mt-6 text-center text-3xl text-white font-bold leading-9 tracking-tight">
              Login
            </h2>
            <p className="mt-2 text-center text-white">Have an account?</p>
          </div>

          {/* Form */}
          <div className="mt-8">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    required
                    className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.email}*
                  </p>
                )}
              </div>

              <div className="w-full relative">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPass ? "text" : "password"}
                    required
                    className="block w-full rounded-full bg-white bg-opacity-10 text-white py-2 px-4 focus:outline-none sm:text-sm"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 top-[45px] transform -translate-y-1/2 pr-3 flex items-center text-black cursor-pointer"
                  >
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.password}*
                  </p>
                )}
              </div>

              {error && <ErrorAlert error={error} />}
              <div className="flex justify-between items-center">
                <label className="flex items-center text-white">
                  <input type="checkbox" className="form-checkbox rounded text-white" />
                  <span className="ml-2">Remember Me</span>
                </label>
                <Link to="/forgot-password" className="text-white text-sm">
                  Forgot Password
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full uppercase tracking-widest justify-center rounded-full ${
                    loading ? "bg-[#ddaf26]" : "bg-[#ddaf26]"
                  } px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#b78e12] focus:outline-none`}
                >
                  {loading ? <Spinner /> : "Sign In"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-white text-sm">
              Not a member?{" "}
              <Link to="/registration" className="font-semibold leading-6 text-white">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

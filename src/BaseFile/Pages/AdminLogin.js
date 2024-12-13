import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../comman/ErrorAlert";
import { loginAdmin, clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../comman/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, admin } = useSelector((state) => state.auth);
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
      dispatch(loginAdmin(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);

      return () => clearTimeout(timer);
    }
    if (admin) {
      navigate(`/admin/dashboard`);
    }
  }, [error, dispatch, admin, navigate]);

  return (
    <>
      <div
        className="flex min-h-screen bg-black"
        style={{
          backgroundImage: `url('/backadmin.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-opacity-50 bg-black">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm px-6 sm:px-8 lg:px-12 pt-4">
              <Link to="/">
                <img
                  className="mx-auto cursor-pointer h-16 w-56"
                  src="/bfc.png"
                  alt="Your Company"
                />
              </Link>
              <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-100">
                Admin Login
              </h2>
            </div>

            <div className="mt-10">
              <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-100"
                  >
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
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 tracking-widest text-xs mt-2">
                      {formik.errors.email}*
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-100"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                    >
                      {showPass ? (
                        <FaRegEyeSlash className="h-6 w-6 text-gray-600" />
                      ) : (
                        <FaRegEye className="h-6 w-6 text-gray-600" />
                      )}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 tracking-widest text-xs mt-2">
                      {formik.errors.password}*
                    </p>
                  )}
                </div>

                {error && <ErrorAlert error={error} />}

                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded ${
                      loading ? "bg-indigo-200" : "bg-indigo-600"
                    } px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600`}
                  >
                    {loading ? <Spinner /> : "Login"}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-sm text-gray-100">
                Not a member?{" "}
                <Link to="/" className="font-semibold text-gray-100">
                  User Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

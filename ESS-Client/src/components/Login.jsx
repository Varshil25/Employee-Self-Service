import { useEffect, useState } from "react";
import ListStyleRight from "./utils/ListStyleRight.jsx";
import axios from "axios";
import { useGlobalContext } from "../context/appContext.jsx";
import CustomAlert from "./utils/CustomAlert.jsx";

function Login() {
  const [employee, setEmployee] = useState({});

  const { alert, isLoading, showAlert, setUpUser } = useGlobalContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  /*
  useEffect(() => {
    console.log(employee);
  }, [employee]);
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    axios
      .post("http://localhost:8080/api/employee/login", employee)
      .then((res) => console.log(res.data));
      */
    await setUpUser(employee);
  };

  return (
    <div className="absolute flex flex-row w-[100%] h-screen text-white mx-0 px-0">
      <div className="left flex items-center justify-center bg-blue-950 w-[100%] h-screen">
        <div className="relative w-[70%] m-auto">
          <h1 className="mb-6 text-4xl font-semibold">
            Forge Success Through Organized Execution
          </h1>
          <h3 className="font-normal mb-6">
            Experience the transformational power of our Project Management Tool
            and forge your path to success through organized execution. Your
            projects deserve nothing less.
          </h3>
          <ul className="font-normal">
            <li className="mb-3 list-inside flex items-center font-light">
              <ListStyleRight />
              Efficiency Redefined
            </li>
            <li className="mb-3 list-inside flex items-center font-light">
              <ListStyleRight />
              Collaboration Unleashed
            </li>
            <li className="mb-3 list-inside flex items-center font-light">
              <ListStyleRight />
              Insights at Your Fingertips
            </li>
            <li className="mb-3 list-inside flex items-center font-light">
              <ListStyleRight />
              Adaptability Perfected
            </li>
            <li className="mb-3 list-inside flex items-center font-light">
              <ListStyleRight />
              Future-Ready Innovation
            </li>
          </ul>
        </div>
      </div>
      <div className="right items-center justify-center bg-black w-[100%] h-screen">
        <div className="flex min-h-full flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {showAlert && (
              <div className="absolute right-10 z-50">
                <CustomAlert />
              </div>
            )}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to continue
            </h2>
            {/* {showAlert && <p>{alert.msg}</p>} */}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-500"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="/getEmail"
                      className="font-semibold text-blue-500 hover:text-blue-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign in
                </button>
              </div>
              <p className="text-xs font-light">
                By clicking below you agree to the DRC Systems Cloud{" "}
                <span className="text-blue-400 cursor-pointer font-medium">
                  {" "}
                  Terms of Service{" "}
                </span>
                and{" "}
                <span className="text-blue-400 cursor-pointer font-medium">
                  {" "}
                  Privacy Policy{" "}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CustomAlert from "./utils/CustomAlert";
import EmployeePersonalDetailsModal from "./EmployeePersonalDetails/EmployeePersonalDetailsModal";

import InitialsAvatar from "react-initials-avatar";

function Navbar() {
  const { authFetch, logoutUser, displayAlert, showAlert, userId } =
    useGlobalContext();

  const [punchOptions, setPunchOptions] = useState(false);
  const [subOptions, setSubOptions] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    authFetch
      .get("/employee/getCurrent")
      .then((res) => setCurrentEmployee(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleOptionsClick = () => {
    if (subOptions) {
      setSubOptions(false);
      setPunchOptions(false);
      setProfileOptions(false);
    } else {
      setSubOptions(true);
      setPunchOptions(false);
      setProfileOptions(false);
    }
  };

  const handlePunchClick = () => {
    if (punchOptions) {
      setPunchOptions(false);
      setSubOptions(false);
    } else {
      setPunchOptions(true);
      setSubOptions(false);
      setProfileOptions(false);
    }
  };

  const handleProfileClick = () => {
    if (profileOptions) {
      setProfileOptions(false);
      setPunchOptions(false);
      setSubOptions(false);
    } else {
      setProfileOptions(true);
      setPunchOptions(false);
      setSubOptions(false);
    }
  };

  const handlePunchIn = () => {
    authFetch
      .post("/punchIn")
      .then((res) =>
        displayAlert(
          res?.data?.message,
          res?.data?.success ? "success" : "error"
        )
      )
      .catch((err) => console.log(err));
  };

  const handlePunchOut = () => {
    authFetch
      .post("/punchOut")
      .then((res) =>
        displayAlert(
          res?.data?.message,
          res?.data?.success ? "success" : "error"
        )
      )
      .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    logoutUser();
  };

  return (
    <div className="fixed bg-slate-800 w-full text-gray-400 py-6">
      <EmployeePersonalDetailsModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        setOpen={setOpen}
        employeeId={userId}
      />
      <div className="w-[95%] m-auto flex flex-row text-center justify-between items-center">
        <div className="left">TruFlux</div>
        <div className="right">
          {showAlert && (
            <div className="absolute right-10 z-50">
              <CustomAlert />
            </div>
          )}
          <ul>
            <div className="relative flex flex-row px-[-20px] items-center">
              <li
                className="px-[10px] cursor-pointer duration-200 hover:text-gray-300"
                onClick={handlePunchClick}
              >
                Punch
              </li>
              <div
                className={`${
                  punchOptions ? "" : "hidden"
                } absolute top-14 w-[150px] h-[100px] rounded-md right-32 bg-gray-950/30 backdrop-blur-md z-10`}
              >
                <ul>
                  <li
                    className="cursor-pointer duration-200 text-green-400  hover:text-green-600"
                    onClick={handlePunchIn}
                  >
                    <span className="mx-2">Punch in</span>
                    <LoginIcon />
                  </li>
                  <li
                    className="cursor-pointer flex justify-center align-middle duration-200 text-red-400  hover:text-red-600"
                    onClick={handlePunchOut}
                  >
                    <span className="mx-2">Punch out</span>
                    <LogoutIcon />
                  </li>
                </ul>
              </div>
              <li
                className="px-[10px] cursor-pointer text-gray-300"
                onClick={handleOpen}
              >
                {currentEmployee?.firstName + " " + currentEmployee?.lastName}
              </li>
              <li
                className="px-[10px] w-[55px] h-[35px] box-border rounded-[50%]"
                onClick={handleProfileClick}
              >
                <InitialsAvatar
                  name={
                    currentEmployee?.firstName + " " + currentEmployee?.lastName
                  }
                  className="object-cover w-[100%] h-[100%] rounded-[50%] cursor-pointer bg-slate-200 flex justify-center items-center text-gray-800"
                />
              </li>
              <div
                className={`${
                  profileOptions
                    ? "opacity-100"
                    : "hidden opacity-0 pointer-events-none"
                } transition-opacity duration-300 absolute top-14 backdrop-blur-md w-[150px] h-[100px] rounded-md right-3 bg-gray-950/50 z-10`}
              >
                <ul>
                  <li className="cursor-pointer duration-200 hover:text-gray-300">
                    Sub-op-1
                  </li>
                  <li className="cursor-pointer duration-200 hover:text-gray-300">
                    View profile
                  </li>
                  <li
                    className="cursor-pointer duration-200 text-red-400  hover:text-red-600"
                    onClick={handleLogOut}
                  >
                    <span>Logout</span>
                    <LogoutIcon fontSize="small" className="ml-2" />
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

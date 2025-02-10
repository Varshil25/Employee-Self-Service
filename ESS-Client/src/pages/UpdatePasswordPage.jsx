import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGlobalContext } from "../context/appContext";
import CustomAlert from "../components/utils/CustomAlert";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function UpdatePasswordPage() {
  const { authFetch, displayAlert, showAlert, logoutUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [updatePasswordRequest, setUpdatePasswordRequest] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatePasswordRequest((request) => ({
      ...request,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    authFetch
      .put("/employee/updatePassword", updatePasswordRequest)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        displayAlert(res?.data?.message, "success");
        setIsLoading(false);
        logoutUser();
        setTimeout(() => {
          window.location = "/login";
        }, 2000);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        setIsLoading(false);
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-32 text-white bg-slate-800 w-[30%] m-auto flex justify-center flex-col items-center rounded-lg">
      {showAlert && (
        <div className="absolute right-10 z-50">
          <CustomAlert />
        </div>
      )}
      <h3 className="my-5 font-semibold text-xl">Forgot Password</h3>
      <p className="font-light ">Enter your email with old and new password</p>
      <div className="text-white my-5">
        <CssTextField
          label="email"
          name="email"
          variant="outlined"
          size="small"
          sx={{ input: { color: "white" } }}
          onChange={handleChange}
        />
      </div>
      <div className="text-white my-5">
        <CssTextField
          type="password"
          label="old password"
          name="oldPassword"
          variant="outlined"
          size="small"
          sx={{ input: { color: "white" } }}
          onChange={handleChange}
        />
      </div>
      <div className="text-white my-5">
        <CssTextField
          type="password"
          label="new password"
          name="newPassword"
          variant="outlined"
          size="small"
          sx={{ input: { color: "white" } }}
          onChange={handleChange}
        />
      </div>
      <Box
        sx={{
          "& > button": { m: 1 },
        }}
      >
        <div className=" rounded-md flex mb-5">
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            variant="contained"
            className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
            onClick={handleSubmit}
          >
            <span>Change password</span>
          </LoadingButton>
        </div>
      </Box>
    </div>
  );
}

export default UpdatePasswordPage;

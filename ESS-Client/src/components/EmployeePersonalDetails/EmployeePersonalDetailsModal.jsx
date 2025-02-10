import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmployeePersonalDetailsModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  employeeId,
}) {
  const { authFetch, displayAlert, userId } = useGlobalContext();
  const [
    personalDetailsOfCurrentEmployee,
    setPersonalDetailsOfCurrentEmployee,
  ] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [canUpdate, setCanUpdate] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  React.useEffect(() => {
    if (userId == employeeId) setCanUpdate(true);
    authFetch
      .get(`/employee/personalDetails/givenId/${employeeId}`)
      .then((res) => {
        setPersonalDetailsOfCurrentEmployee(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPersonalDetailsOfCurrentEmployee((details) => ({
      ...details,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(personalDetailsOfCurrentEmployee);
    authFetch
      .post("/employee/personalDetails", personalDetailsOfCurrentEmployee)
      .then((res) => {
        displayAlert("Personal information updated successfully..", "success");
        // setIsChanged((prev) => !prev);
        handleClose();
        setIsLoading(false);
        setIsUpdating(false);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        console.log(err);
        setIsLoading(false);
        setIsUpdating(false);
      });
  };

  return (
    <div className="rounded-md">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="ronded-md"
      >
        <Box sx={style}>
          <div className="w-[95%] flex justify-between p-5 pb-10">
            <div className="w-[100%] m-auto">
              <h1 className="text-xl text-gray-100 align-middle font-medium text-center mb-8">
                Personal details
              </h1>
              <form className="w-[100%]">
                <div className="flex flex-row justify-between">
                  <div>
                    <label
                      htmlFor="personalEmail"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Personal email
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="email"
                        name="personalEmail"
                        id="personalEmail"
                        onChange={handleChange}
                        value={personalDetailsOfCurrentEmployee?.personalEmail}
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="personalMobile"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Mobile
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="personalMobile"
                        id="personalMobile"
                        onChange={handleChange}
                        value={personalDetailsOfCurrentEmployee?.personalMobile}
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      DOB
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        onChange={handleChange}
                        value={personalDetailsOfCurrentEmployee.dateOfBirth}
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-5">
                  <div>
                    <label
                      htmlFor="emergencyContactName1"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Emergency Contact Name1
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="emergencyContactName1"
                        id="emergencyContactName1"
                        onChange={handleChange}
                        value={
                          personalDetailsOfCurrentEmployee?.emergencyContactName1
                        }
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="emergencyContactNumber1"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Emergency Contact Number1
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="emergencyContactNumber1"
                        id="emergencyContactNumber1"
                        onChange={handleChange}
                        value={
                          personalDetailsOfCurrentEmployee?.emergencyContactNumber1
                        }
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div className="mt-2 mb-2 w-[17%]"></div>
                </div>
                <div className="flex flex-row justify-between mt-5">
                  <div>
                    <label
                      htmlFor="emergencyContactName2"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Emergency Contact Name2
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="emergencyContactName2"
                        id="emergencyContactName2"
                        onChange={handleChange}
                        value={
                          personalDetailsOfCurrentEmployee?.emergencyContactName2
                        }
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="emergencyContactNumber2"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Emergency Contact Number2
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="emergencyContactNumber2"
                        id="emergencyContactNumber2"
                        onChange={handleChange}
                        value={
                          personalDetailsOfCurrentEmployee?.emergencyContactNumber2
                        }
                        disabled={!isUpdating}
                      />
                    </div>
                  </div>
                  <div className="mt-2 mb-2 w-[17%]"></div>
                </div>
                {/* <div className="flex flex-row justify-between mt-10">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Country
                    </label>
                    <div className="mt-2 mb-2">
                      <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="w-[100%]"
                      >
                        <option value="">Select Country</option>
                        {Object.keys(data).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div> */}
                {isUpdating ? (
                  <div className="flex justify-between mt-5">
                    <Box
                      sx={{
                        "& > button": { m: 1 },
                      }}
                    >
                      <div className="bg-white rounded-md">
                        <LoadingButton
                          loading={isLoading}
                          loadingPosition="start"
                          variant="contained"
                          className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                          onClick={handleSubmit}
                        >
                          <span>Update Details</span>
                        </LoadingButton>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        "& > button": { m: 1 },
                      }}
                    >
                      <div className="bg-white rounded-md">
                        <LoadingButton
                          loading={isLoading}
                          loadingPosition="start"
                          variant="contained"
                          className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                          onClick={handleClose}
                        >
                          <span>Close</span>
                        </LoadingButton>
                      </div>
                    </Box>
                  </div>
                ) : canUpdate ? (
                  <div className="flex justify-between mt-5">
                    <Box
                      sx={{
                        "& > button": { m: 1 },
                      }}
                    >
                      <div className="bg-white rounded-md">
                        <LoadingButton
                          loading={isLoading}
                          loadingPosition="start"
                          variant="contained"
                          className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                          onClick={() => setIsUpdating(true)}
                        >
                          <span>Edit Details</span>
                        </LoadingButton>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        "& > button": { m: 1 },
                      }}
                    >
                      <div className="bg-white rounded-md">
                        <LoadingButton
                          loading={isLoading}
                          loadingPosition="start"
                          variant="contained"
                          className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                          onClick={handleClose}
                        >
                          <span>Close</span>
                        </LoadingButton>
                      </div>
                    </Box>
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

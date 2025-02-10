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
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateEmployeeModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  allRoles,
  allTeams,
  setIsChanged,
  employee,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const [newEmployee, setNewEmployee] = React.useState(employee);
  const [updatedEmployee, setUpdatedEmployee] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    authFetch
      .get(`/employee/${employee?.id}`)
      .then((res) => {
        setNewEmployee(res.data);
      })
      .catch((err) => console.log(err));
  }, [employee]);

  React.useEffect(() => {
    updatedEmployee.teamId = newEmployee?.team?.id;
    updatedEmployee.roleId = newEmployee?.role?.id;
  }, [newEmployee]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedEmployee((oldEmployee) => ({
      ...oldEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // console.log(newEmployee);
    authFetch
      .put(`/employee/${employee.id}`, updatedEmployee)
      .then((res) => {
        console.log(res.data);
        displayAlert(
          res.data.firstName +
            " " +
            res.data.lastName +
            " updated successfully",
          "success"
        );
        setIsChanged((prev) => !prev);
        handleClose();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        console.log(err);
        setIsLoading(false);
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
                Update Emplyee {employee.name}
              </h1>
              <form className="w-[100%]">
                <div className="flex flex-col justify-between mt-10">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Role
                    </label>
                    <div className="mt-2 mb-2">
                      <select
                        name="roleId"
                        id="role"
                        className="w-[100%]"
                        defaultValue={newEmployee?.role?.id}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          ---------------select role---------------
                        </option>
                        {allRoles.map((role) => (
                          <option
                            value={role.id}
                            key={role.id}
                            className="text-center"
                            selected={role.id == newEmployee?.role?.id}
                          >
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="team"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Team
                    </label>
                    <div className="mt-2 mb-2">
                      <select
                        name="teamId"
                        id="team"
                        className="w-[100%]"
                        defaultValue={newEmployee?.team?.id}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          ---------------select team---------------
                        </option>
                        {allTeams.map((team) => (
                          <option
                            value={team.id}
                            key={team.id}
                            className="text-center"
                            selected={newEmployee?.team?.id == team.id}
                          >
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  {/* <button
                    type="submit"
                    className={`bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400 ${
                      isLoading ? "bg-gray-500 hover:bg-gray-500" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {!isLoading ? "Add Employee" : "Loading.."}
                  </button>
                  <button
                    type="close"
                    className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    {!isLoading ? "Close" : "Loading.."}
                  </button> */}
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
                        <span>Update Employee</span>
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
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

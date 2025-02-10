import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid gray",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const roles = [
  {
    id: "OWNER",
    name: "Owner",
  },
  {
    id: "MANAGER",
    name: "manager",
  },
  {
    id: "MEMBER",
    name: "Member",
  },
  {
    id: "EXTERNAL",
    name: "External",
  },
];

export default function AddProjectMemberModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const { projectId } = useParams();
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [newMember, setNewMember] = React.useState({
    projectId: projectId,
  });
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    authFetch
      .get(`/employee/all`)
      .then((res) => setAllEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewMember((member) => ({
      ...member,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsloading(true);
    e.preventDefault();
    // console.log(newTask);
    authFetch
      .post("/project/addMember", newMember)
      .then((res) => {
        displayAlert(res.data.message, "success");
        handleClose();
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-white"
          >
            Add member
          </Typography>
          <div className="">
            <form className="bg-neutral-800 rounded p-5 text-neutral-100">
              <div className="my-4">
                <label htmlFor="employeeId">Employee</label>
                <br />
                <select
                  name="employeeId"
                  id="employeeId"
                  className="rounded-sm text-black"
                  defaultValue={""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    -----------select employee-----------
                  </option>
                  {allEmployees.map((employee) => (
                    <option
                      value={employee.id}
                      key={employee.id}
                      className="text-center"
                    >
                      {employee.firstName + " " + employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4">
                <label htmlFor="role">Role</label>
                <br />
                <select
                  name="role"
                  id="role"
                  className="rounded-sm text-black"
                  defaultValue={""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ----------select role----------
                  </option>
                  {roles.map((role) => (
                    <option
                      value={role.id}
                      key={role.id}
                      className="text-center"
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="flex justify-between mt-3">
            {/* <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Add employee</Button> */}
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
                  <span>Add Member</span>
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
        </Box>
      </Modal>
    </div>
  );
}

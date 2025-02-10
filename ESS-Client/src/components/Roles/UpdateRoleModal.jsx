import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";

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

export default function UpdateRoleModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  setIsChanged,
  role,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const [currentRole, setCurrentRole] = React.useState({});

  React.useEffect(() => {
    authFetch
      .get(`/role/${role.id}`)
      .then((res) => setCurrentRole(res.data))
      .catch((err) => console.log(err));
  }, [role]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCurrentRole((oldRole) => ({
      ...oldRole,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentRole);
    authFetch
      .put(`/role/${role.id}`, currentRole)
      .then((res) => {
        displayAlert(res.data.name + " role added successfully", "success");
        setIsChanged((prev) => !prev);
        handleClose();
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        console.log(err);
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
                Update Role
              </h1>
              <form className="w-[100%]">
                <div className="flex flex-row justify-between">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Role name
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={currentRole?.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <label
                      htmlFor="teamDescription"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Role discription
                    </label>
                    <div className="mt-2 mb-2">
                      <textarea
                        name="description"
                        id=""
                        cols="30"
                        onChange={handleChange}
                        value={currentRole?.description}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                    onClick={handleSubmit}
                  >
                    Update Role
                  </button>
                  <button
                    type="close"
                    className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

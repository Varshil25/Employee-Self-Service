import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
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

export default function AddNoteModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  option,
  leave,
  setIsChanged,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [note, setNote] = React.useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    leave.status = option === "approve" ? "APPROVED" : "REJECTED";
    // console.log(leave, note);
    authFetch
      .put(`/leave/changeStatus/${leave.id}`, {
        leave,
        note,
        requestEmployeeId: leave.requestEmployeeId,
      })
      .then((res) => {
        // console.log(res.data);
        displayAlert("Leave request updated successfully", "success");
        setIsLoading(false);
        handleClose();
        setIsChanged((prev) => !prev);
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
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
            Are you sure you want to {option}
          </Typography>
          <div className="flex flex-col justify-between mt-5">
            <textarea
              name="note"
              rows="3"
              placeholder="Add note"
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-between mt-4">
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
                    <span>{option}</span>
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
          </div>
        </Box>
      </Modal>
    </div>
  );
}

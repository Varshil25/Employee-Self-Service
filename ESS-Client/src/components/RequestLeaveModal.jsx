import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import RequestLeave from "./RequestLeave";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RequestLeaveModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RequestLeave
            button={
              <button
                onClick={handleClose}
                className="bg-blue-400/70 p-2 mt-2 text-sm text-black rounded-md hover:bg-blue-200 duration-300"
              >
                Close
              </button>
            }
          />
        </Box>
      </Modal>
    </div>
  );
}

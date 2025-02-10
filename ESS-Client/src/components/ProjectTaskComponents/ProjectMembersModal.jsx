import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";
import { useParams } from "react-router-dom";
import ListOfMembersTable from "./ListOfMembersTable";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "black",
  border: "2px solid gray",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ProjectMembersModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const { projectId } = useParams();
  const [membersToDisplay, setMembersToDisplay] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    authFetch(`/project/${projectId}`)
      .then((res) => {
        setSelectedProject(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    const tempArray = [];
    selectedProject?.members?.forEach((member) => {
      const tempObj = {};
      tempObj.id = member.id;
      tempObj.role = member.role;
      tempObj.name = member.employee.firstName + " " + member.employee.lastName;
      tempArray.push(tempObj);
    });
    setMembersToDisplay(tempArray);
    setIsLoading(false);
  }, [selectedProject]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Project members
          </Typography>
          <ListOfMembersTable listOfMembers={membersToDisplay} />
          <Box className="mt-3">
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
              onClick={handleClose}
            >
              <span>Close</span>
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";
import { useParams } from "react-router-dom";

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

const allStatus = [
  {
    id: "TODO",
    name: "Todo",
  },
  {
    id: "IN_PROGRESS",
    name: "In progress",
  },
  {
    id: "IN_REVIEW",
    name: "In review",
  },
  {
    id: "DONE",
    name: "Done",
  },
];

const allPriorities = [
  {
    id: "NONE",
    name: "None",
  },
  {
    id: "LOW",
    name: "Low",
  },
  {
    id: "MEDIUM",
    name: "Medium",
  },
  {
    id: "HIGH",
    name: "High",
  },
];

export default function UpdateTaskModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  column,
  setTaskUpdate,
  task,
}) {
  const { authFetch, displayAlert } = useGlobalContext();
  const { projectId } = useParams();
  const [selectedProject, setSelectedProject] = React.useState({});
  const [selectedTask, setSelectedTask] = React.useState({});

  React.useEffect(() => {
    authFetch
      .get(`/project/${projectId}`)
      .then((res) => setSelectedProject(res.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    authFetch
      .get(`/task/withId/${task}`)
      .then((res) => setSelectedTask(res.data))
      .catch((err) => console.log(err));
  }, [task]);

  // React.useEffect(() => {
  //   console.log(selectedTask);
  // }, [selectedTask]);

  const handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "assignTo") value = await JSON.parse(value);
    setSelectedTask((oldTask) => ({
      ...oldTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating: ", selectedTask);

    authFetch
      .put(`/task/updateTask/${selectedTask?.id}`, selectedTask)
      .then((res) => {
        displayAlert(res.data.message, "success");
        setTaskUpdate((prev) => !prev);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        console.log(err);
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
            Update task {task.name}
          </Typography>
          <div className="">
            <form className="bg-neutral-800 rounded p-5 text-neutral-100">
              <div className="mb-4">
                <label htmlFor="name">Title</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-sm text-black"
                  onChange={handleChange}
                  value={selectedTask?.name}
                />
              </div>

              <div className="my-4">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="23"
                  rows="5"
                  className="rounded-sm text-black"
                  onChange={handleChange}
                  value={selectedTask?.description}
                ></textarea>
              </div>

              <div className="my-4">
                <label htmlFor="status">Status</label>
                <br />
                <select
                  name="status"
                  id="status"
                  className="rounded-sm text-black"
                  onChange={handleChange}
                  defaultValue={selectedTask?.status}
                >
                  <option value="" disabled>
                    -----------select status-----------
                  </option>
                  {allStatus.map((status) => (
                    <option
                      value={status.id}
                      key={status.id}
                      className="text-center"
                      selected={
                        selectedTask?.status?.toLowerCase() ===
                        status.name.toLowerCase()
                      }
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4">
                <label htmlFor="priority">Priority</label>
                <br />
                <select
                  name="priority"
                  id="priority"
                  className="rounded-sm text-black"
                  defaultValue={selectedTask?.priority}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ----------select priority----------
                  </option>
                  {allPriorities.map((priority) => (
                    <option
                      value={priority.id}
                      key={priority.id}
                      className="text-center"
                      selected={
                        selectedTask?.priority?.toLowerCase() ===
                        priority.name.toLowerCase()
                      }
                    >
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-4">
                <label htmlFor="assignTo">Assign To</label>
                <br />
                <select
                  name="assignTo"
                  id="assignTo"
                  className="rounded-sm text-black"
                  defaultValue={selectedTask?.assignTo?.name}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---------select assignee---------
                  </option>
                  {selectedProject?.members?.map((member) => (
                    <option
                      value={JSON.stringify(member.employee)}
                      key={member.employee.id}
                      className="text-center"
                    >
                      {member.employee.firstName +
                        " " +
                        member.employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="flex justify-between">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Update task</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

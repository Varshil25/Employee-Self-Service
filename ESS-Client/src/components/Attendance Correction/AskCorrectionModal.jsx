import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import moment from "moment";

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

export default function AskCorrectionModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  date,
}) {
  const { authFetch, displayAlert, userId } = useGlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(date);
  const [attendaceCorrectionRequest, setattendaceCorrectionRequest] =
    React.useState({
      year: Number(selectedDate?.split("-")[0]),
      month: Number(selectedDate?.split("-")[1]),
      day: Number(selectedDate?.split("-")[2]),
    });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setattendaceCorrectionRequest((correction) => ({
      ...correction,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  React.useEffect(() => {
    setattendaceCorrectionRequest((correction) => ({
      ...correction,
      year: Number(selectedDate?.split("-")[0]),
      month: Number(selectedDate?.split("-")[1]),
      day: Number(selectedDate?.split("-")[2]),
    }));
  }, [selectedDate]);

  React.useEffect(() => {
    console.log(attendaceCorrectionRequest);
  }, [attendaceCorrectionRequest]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("Requesting", attendaceCorrectionRequest);
    authFetch
      .post("/correction", attendaceCorrectionRequest)
      .then((res) => {
        displayAlert(
          "Attendance correction request added successfully",
          "success"
        );
        // setIsChanged((prev) => !prev);
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
        handleClose();
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
                Correction request
              </h1>
              <form className="w-[100%]">
                <div className="flex flex-row justify-between">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Date
                    </label>
                    <div className="mt-2 mb-2">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                        value={selectedDate}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-5">
                  <div>
                    <label
                      htmlFor="remark"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Remark
                    </label>
                    <div className="mt-2 mb-2">
                      <textarea
                        name="remark"
                        id="remark"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
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
                        <span>Ask correction</span>
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

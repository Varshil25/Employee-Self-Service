import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";

function RequestLeave({ button }) {
  const { authFetch } = useGlobalContext();

  const [leaveRequest, setLeaveRequest] = useState({});
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);

  const [minEndDate, setMinEndDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "from" && value !== "") {
      setIsStartDateSelected(true);
      setMinEndDate(value);
    } else {
      setIsStartDateSelected(false);
      setMinEndDate("");
    }
    setLeaveRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authFetch
      .post("/leave", leaveRequest)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[95%] m-auto flex flex-row align-middle items-center justify-center bg-gray-300/40 backdrop-blur-md rounded-md p-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="w-[100%]">
          <div className="flex justify-between">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Start date
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="date"
                  name="from"
                  id="startDate"
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                End date
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="date"
                  name="to"
                  id="endDate"
                  onChange={handleChange}
                  disabled={isStartDateSelected ? false : true}
                  min={minEndDate}
                />
              </div>
            </div>
          </div>

          <div className="flex align-middle w-[100%]">
            <div className="w-[50%]">
              <label
                htmlFor="reason"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Reason
              </label>
              <div className="mt-2 mb-2">
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  className="w-[100%]"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-[50%] ml-28">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Leave type
              </label>
              <div className="mt-2 mb-2">
                <select
                  name="type"
                  id="reason"
                  onChange={handleChange}
                  className="w-[100%]"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    ---select type---
                  </option>
                  <option value="PAID" className="text-center">
                    Paid
                  </option>
                  <option value="UNPAID" className="text-center">
                    Unpaid
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-400/70 p-2 mt-2 text-sm rounded-md hover:bg-blue-200 duration-300"
            >
              Add request
            </button>
            {button}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestLeave;

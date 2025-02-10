import React, { useEffect, useInsertionEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";
import AdminLeaveRequestTable from "../components/Admin Leave Requests/AdminLeaveRequestTable";
import CounterCard from "../components/CounterCard";
import SideBar from "../components/SideBar";
import AdminAttendanceCorrectionTable from "../components/Attendance Correction/AdminAttendanceCorrectionTable";

function DisplayLeaveRequests({
  allLeaveRequestsProps = [],
  allCorrectionREquestsProps = [],
  heading,
  setIsChanged,
}) {
  const { authFetch, role, team } = useGlobalContext();

  const [allLeaveRequests, setAllLeaveRequests] = useState([]);
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [rejectedLeaveRequests, setRejectedLeaveRequests] = useState([]);
  const [approvedLeaveRequests, setApprovedLeaveRequests] = useState([]);
  const [typeToDisplay, setTypeToDisplay] = useState("all");
  const [leavesToDisplay, setLeavesToDisplay] = useState([]);

  const filterLeaveRequests = () => {
    const pending = [];
    const rejected = [];
    const approved = [];

    allLeaveRequests?.forEach((leaveRequest) => {
      if (leaveRequest?.status?.toString().toLowerCase() === "pending") {
        pending.push(leaveRequest);
      } else if (
        leaveRequest?.status?.toString().toLowerCase() === "rejected"
      ) {
        rejected.push(leaveRequest);
      } else {
        approved.push(leaveRequest);
      }
    });

    setPendingLeaveRequests(pending);
    setApprovedLeaveRequests(approved);
    setRejectedLeaveRequests(rejected);
  };

  useEffect(() => {
    const tempArray = allLeaveRequestsProps;

    setLeavesToDisplay(tempArray);
    setAllLeaveRequests(tempArray);
  }, [allLeaveRequestsProps]);

  useEffect(() => {
    filterLeaveRequests();
  }, [allLeaveRequests, allLeaveRequestsProps]);

  const handleTypeChange = (type) => {
    setTypeToDisplay(type);
    if (type === "pending") {
      setLeavesToDisplay(pendingLeaveRequests);
    } else if (type === "rejected") {
      setLeavesToDisplay(rejectedLeaveRequests);
    } else if (type === "approved") {
      setLeavesToDisplay(approvedLeaveRequests);
    } else {
      setLeavesToDisplay(allLeaveRequests);
    }
  };

  return (
    <div className="flex flex-wrap justify-items-center overflow-y-hidden">
      <div className="right w-[100%] mx-auto">
        <div className="relative top-10 w-[95.5%] m-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
          <div onClick={() => handleTypeChange("all")} className="w-[95%] p-5">
            <CounterCard
              countHeading={heading}
              count={allLeaveRequests.length}
              bg={"gray"}
            />
          </div>
          <div className="w-[95%] flex justify-between text-center p-5 pb-10">
            <div onClick={() => handleTypeChange("all")}>
              <CounterCard
                countHeading={"Total req"}
                count={allLeaveRequests.length}
                bg={"gray"}
              />
            </div>
            <div onClick={() => handleTypeChange("approved")}>
              <CounterCard
                countHeading={"Approved"}
                count={approvedLeaveRequests.length}
                bg={"green"}
              />
            </div>
            <div onClick={() => handleTypeChange("pending")}>
              <CounterCard
                countHeading={"Pending"}
                count={pendingLeaveRequests.length}
                bg={"gray"}
              />
            </div>
            <div onClick={() => handleTypeChange("rejected")}>
              <CounterCard
                countHeading={"Rejected"}
                count={rejectedLeaveRequests.length}
                bg={"red"}
              />
            </div>
          </div>
        </div>
        <div className="relative top-10 w-[95.5%] m-auto flex flex-row align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
          <div className="w-[95%] p-5 pb-10">
            <p className="text-white text-base font-semibold mb-3">
              All the {typeToDisplay === "all" ? "" : typeToDisplay} leave
              requests
            </p>
            <AdminLeaveRequestTable
              allPreviousLeaveRequests={leavesToDisplay}
              setIsChanged
            />
          </div>
        </div>
        <div className="relative top-10 w-[95.5%] m-auto flex flex-row align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
          <div className="w-[95%] p-5 pb-10">
            <p className="text-white text-base font-semibold mb-3">
              All the attendance correction request
            </p>
            <AdminAttendanceCorrectionTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayLeaveRequests;

import React, { useState, useEffect } from "react";
import CounterCard from "./CounterCard";

function LeaveCount({ allPreviousLeaveRequests }) {
  const [approvedLeavesCount, setApprovedLeavesCount] = useState(0);
  const [pendingLeavesCount, setPendingLeavesCount] = useState(0);
  const [rejectedLeavesCount, setRejectedLeavesCount] = useState(0);

  const countLeavesByStatus = () => {
    allPreviousLeaveRequests.forEach((leave) => {
      if (leave.status.toString().toLowerCase() === "approved") {
        setApprovedLeavesCount((prevCnt) => prevCnt + 1);
      } else if (leave.status.toString().toLowerCase() === "pending") {
        setPendingLeavesCount((prevCnt) => prevCnt + 1);
      } else {
        setRejectedLeavesCount((prevCnt) => prevCnt + 1);
      }
    });
  };

  useEffect(() => {
    countLeavesByStatus();
  }, [allPreviousLeaveRequests]);

  return (
    <div className=" mt-24 w-[95%] mx-auto bg-gray-800 backdrop-blur-md rounded-md p-[30px]">
      <div className="rounded-md w-[95%] h-[50%] mb-5 mx-auto">
        <CounterCard
          countHeading={"total leave requests"}
          count={allPreviousLeaveRequests?.length}
          bg={"gray"}
        />
      </div>
      <div className="flex flex-row align-middle items-center justify-between rounded-md w-[95%] h-[50%] mx-auto">
        <CounterCard
          countHeading={"Approved"}
          count={approvedLeavesCount}
          bg={"green"}
        />
        <CounterCard
          countHeading={"Pending"}
          count={pendingLeavesCount}
          bg={"grey"}
        />
        <CounterCard
          countHeading={"Rejected"}
          count={rejectedLeavesCount}
          bg={"red"}
        />
      </div>
    </div>
  );
}

export default LeaveCount;

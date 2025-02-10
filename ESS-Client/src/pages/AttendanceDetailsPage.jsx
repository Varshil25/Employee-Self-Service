import React from "react";
import SideBar from "../components/SideBar";
import DatesAndPunchInOutLog from "../components/DatesAndPunchInOutLog";

function AttendanceDetailsPage() {
  return (
    <>
      <div className="absolute h-screen w-screen bg-black overflow-hidden">
        <div className="flex flex-row">
          <div className="left w-[15%]">
            <SideBar />
          </div>
          <div className="right w-[85%] h-screen">
            <DatesAndPunchInOutLog />
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceDetailsPage;

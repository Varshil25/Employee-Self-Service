import PunchInOutTable from "./PunchInOutTable";
import DateTable from "./DateTable";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";

let dateObj = new Date();

const getPunchInAndOutRequest = {
  day: "",
  month: "",
  year: "",
};

function DatesAndPunchInOutLog() {
  const { authFetch } = useGlobalContext();

  const [todayPunchs, setTodayPunchs] = useState({});
  const [datesWithNetHours, setDatesWithNetHours] = useState({});
  const [currentDate, setCurrentDate] = useState(
    String(dateObj.getFullYear()) +
      "-" +
      String(dateObj.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObj.getDate()).padStart(2, "0")
  );

  useEffect(() => {
    authFetch
      .get("/punches/allDates")
      .then((res) => {
        setDatesWithNetHours(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const date = currentDate.split("-");
    getPunchInAndOutRequest.year = date[0];
    getPunchInAndOutRequest.day = date[2];
    getPunchInAndOutRequest.month = date[1];

    authFetch
      .post("/punches", getPunchInAndOutRequest)
      .then((res) => setTodayPunchs(res.data))
      .catch((err) => console.log(err));
  }, [currentDate]);

  return (
    <div className="relative top-24 w-[95%] m-auto flex flex-row align-middle items-center justify-center px-[-40px] bg-gray-800 backdrop-blur-md rounded-md pb-5 mb-6">
      <div className="w-[60%] px-[20px]">
        <p className="text-white text-base font-semibold my-3">
          Punch logs of {currentDate}
        </p>
        <PunchInOutTable todaysPunches={todayPunchs} />
      </div>
      <div className="w-[40%] px-[20px]">
        <p className="text-white text-base font-semibold my-3">
          Select day from here
        </p>
        <DateTable
          datesWithNetHours={datesWithNetHours}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
    </div>
  );
}

export default DatesAndPunchInOutLog;

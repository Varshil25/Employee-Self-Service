import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";
import SideBar from "../components/SideBar";
import CustomAlert from "../components/utils/CustomAlert";
import ListOfEmployeesTable from "../components/Employees/ListOfEmployeesTable";
import MyTeamEmployeesTable from "../components/MyTeam/MyTeamEmployeesTable";
import DisplayLeaveRequests from "./DisplayLeaveRequests";

function MyTeamPage() {
  const { authFetch, showAlert, alert, userId, role } = useGlobalContext();
  const [listOfEmployees, setListOfEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [listOfEmployeesToDisplay, setListOfEmployeesToDisplay] = useState([]);
  const [listOfLeaveRequest, setListOfLeaveRequest] = useState([]);
  const [listOfLeaveRequestToDisplay, setListOfLeaveRequestToDisplay] =
    useState([]);
  const [displayReq, setDisplayReq] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    parseInt(new Date().getFullYear())
  );
  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(new Date().getMonth() + 1)
  );
  const [employeeAnalysisMap, setEmployeeAnalysisMap] = useState({
    map: new Map(),
  });

  const currentYear = new Date().getFullYear();

  // Generate an array of years from 2000 to the current year
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => 2000 + index
  );

  const yearOptions = years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const monthOptions = months.map((month) => (
    <option
      key={month.id}
      value={month.id}
      selected={month.id === selectedMonth}
    >
      {month.name}
    </option>
  ));

  useEffect(() => {
    authFetch
      .get(`/leave/team/${currentEmployee?.team?.id}/getAll`)
      .then((res) => {
        setListOfLeaveRequest(res.data);
        // console.log("Req:", res.data);
      })
      .catch((err) => console.log(err));
  }, [currentEmployee, isChanged]);

  useEffect(() => {
    authFetch
      .get("/employee/getCurrent")
      .then((res) => setCurrentEmployee(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authFetch
      .get(`/employee/team/${currentEmployee?.team?.id}/all`)
      .then((res) => setListOfEmployees(res.data))
      .catch((err) => console.log(err));
  }, [currentEmployee]);

  useEffect(() => {
    listOfEmployees.forEach((employee) => {
      authFetch
        .get(
          `/employee/getAnalysis/${employee.id}/${selectedYear}/${selectedMonth}`
        )
        .then((res) => {
          setEmployeeAnalysisMap(({ map }) => ({
            map: map.set(employee.id, res.data),
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [listOfEmployees, selectedMonth, selectedYear]);

  useEffect(() => {
    console.log("MAP: ", employeeAnalysisMap);
    const tempArray = [];
    listOfEmployees.forEach((employee) => {
      const tempObj = {};
      tempObj.id = employee.id;
      tempObj.name = employee.firstName + " " + employee.lastName;
      tempObj.email = employee.email;
      tempObj.totalLeavesTaken = employee.totalLeavesTaken;
      tempObj.totalLeavesLeft = employee.totalLeavesLeft;
      tempObj.role = employee.role.name;
      tempObj.team = employee.team.name;
      tempObj.monthlyNetMinutes =
        employeeAnalysisMap?.map
          ?.get(employee.id)
          ?.monthlyNetMinutes?.split(":")[0] +
        ":" +
        employeeAnalysisMap?.map
          ?.get(employee.id)
          ?.monthlyNetMinutes?.split(":")[1];
      tempObj.totalActiveDays = employeeAnalysisMap?.map?.get(
        employee.id
      )?.totalActiveDays;
      tempObj.averageWorkMinutes =
        employeeAnalysisMap?.map
          ?.get(employee.id)
          ?.averageWorkHours?.split(":")[0] +
        ":" +
        employeeAnalysisMap?.map
          ?.get(employee.id)
          ?.averageWorkHours?.split(":")[1];
      tempArray.push(tempObj);
    });
    setListOfEmployeesToDisplay(tempArray);
  }, [employeeAnalysisMap]);

  useEffect(() => {
    setListOfLeaveRequestToDisplay(listOfLeaveRequest);
    // setDisplayReq(true);
  }, [listOfLeaveRequest, role]);

  useEffect(() => {
    if (role.toLowerCase() === "admin" || role.toLowerCase() === "manager") {
      setDisplayReq(true);
    }
  }, []);

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <div className="left relative w-[15%]">
        <SideBar />
      </div>
      <div className="right w-[85%] h-screen">
        <div className="relative top-24">
          {showAlert && (
            <div className="absolute right-10 z-50">
              <CustomAlert />
            </div>
          )}
          <div className="w-[95.5%] mx-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md">
            <div className="w-[95%] py-8">
              <div className="flex justify-between">
                <p className="text-white text-base font-semibold mb-3">
                  My team
                </p>
                <div className="w-[30%] flex justify-between">
                  <p className="text-white text-base font-semibold mb-3">
                    Analysis of:
                  </p>
                  <select
                    defaultValue={selectedYear}
                    onChange={handleYearChange}
                    className="h-[70%]"
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {yearOptions}
                  </select>
                  <select onChange={handleMonthChange} className="h-[70%]">
                    <option value="" disabled>
                      Select Month
                    </option>
                    {monthOptions}
                  </select>
                </div>
              </div>
              <MyTeamEmployeesTable
                listOfEmployees={listOfEmployeesToDisplay}
              />
            </div>
          </div>
          {displayReq ? (
            <div className="w-full mx-auto flex flex-col align-middle items-center justify-center backdrop-blur-md rounded-md mb-5">
              <div className="w-full py-8">
                <DisplayLeaveRequests
                  allLeaveRequestsProps={listOfLeaveRequestToDisplay}
                  heading={"All the leave requests in team"}
                  setIsChanged
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTeamPage;

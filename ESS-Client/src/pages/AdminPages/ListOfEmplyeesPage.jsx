import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/appContext";
import SideBar from "../../components/SideBar";
import ListOfEmployeesTable from "../../components/Employees/ListOfEmployeesTable";
import AddEmployeeMoal from "../../components/Employees/AddEmployeeMoal";
import CustomAlert from "../../components/utils/CustomAlert";
import UpdateEmployeeModal from "../../components/Employees/UpdateEmployeeModal";
import MyTeamEmployeesTable from "../../components/MyTeam/MyTeamEmployeesTable";

function ListOfEmplyeesPage() {
  const { authFetch, showAlert, alert } = useGlobalContext();
  const [listOfAllEmployees, setListOfAllEmployees] = useState([]);
  const [listOfEmployeesToDisplay, setListOfEmployeesToDisplay] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [allTeams, setAllTeams] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
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

  const handleOpen = () => {
    setIsAdding(true);
  };

  const handleClose = () => {
    setIsAdding(false);
  };

  const handleUpdateOpen = () => {
    setIsUpdating(true);
  };

  const handleUpdateClose = () => {
    setIsUpdating(false);
  };

  useEffect(() => {
    authFetch
      .get("/role/all")
      .then((res) => {
        setAllRoles(res.data);
      })
      .catch((err) => console.log(err));

    authFetch
      .get("/team/all")
      .then((res) => {
        setAllTeams(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authFetch
      .get("/employee/all")
      .then((res) => setListOfAllEmployees(res.data))
      .catch((err) => console.log(err));
  }, [isChanged]);

  useEffect(() => {
    listOfAllEmployees.forEach((employee) => {
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
  }, [listOfAllEmployees, selectedMonth, selectedYear]);

  useEffect(() => {
    const tempArray = [];
    listOfAllEmployees.forEach((employee) => {
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

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <AddEmployeeMoal
        open={isAdding}
        setOpen={setIsAdding}
        handleClose={handleClose}
        handleOpen={handleOpen}
        allRoles={allRoles}
        allTeams={allTeams}
        setIsChanged={setIsChanged}
      />
      <UpdateEmployeeModal
        allRoles={allRoles}
        allTeams={allTeams}
        employee={selectedEmployee}
        handleClose={handleUpdateClose}
        handleOpen={handleUpdateOpen}
        open={isUpdating}
        setIsChanged={setIsChanged}
        setOpen={setIsUpdating}
      />
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
          <div className="w-[95.5%] m-auto flex flex-col align-middle justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
            <div className="w-[95%] pb-8 mx-auto">
              <div className="flex justify-between my-5">
                <p className="text-white text-base font-semibold ">Employee</p>
                <div className="w-[30%] flex justify-between">
                  <p className="text-white text-base font-semibold">
                    Analysis of:
                  </p>
                  <select
                    defaultValue={selectedYear}
                    onChange={handleYearChange}
                    className="h-[90%]"
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {yearOptions}
                  </select>
                  <select onChange={handleMonthChange} className="h-[90%]">
                    <option value="" disabled>
                      Select Month
                    </option>
                    {monthOptions}
                  </select>
                </div>
              </div>
              <ListOfEmployeesTable
                listOfEmployees={listOfEmployeesToDisplay}
                setSelectedEmployee={setSelectedEmployee}
                handleOpen={handleUpdateOpen}
              />
              <button
                className="bg-blue-400/70 p-2 mt-4 text-sm text-black rounded-md hover:bg-blue-200 duration-300"
                onClick={handleOpen}
              >
                Add +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOfEmplyeesPage;

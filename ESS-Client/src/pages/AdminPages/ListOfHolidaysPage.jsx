import React, { useEffect, useState } from "react";
import ListOfTeamsTable from "../../components/Teams/ListOfTeamsTable";
import { useGlobalContext } from "../../context/appContext";
import AddTeamModal from "../../components/Teams/AddTeamModal";
import SideBar from "../../components/SideBar";
import CustomAlert from "../../components/utils/CustomAlert";
import AddHolidayModal from "../../components/Holidays/AddHolidayModal";
import ListOfHolidaysTable from "../../components/Holidays/ListOfHolidaysTable";
import UpdateHolidayModal from "../../components/Holidays/UpdateHolidayModal";

function ListOfHolidaysPage() {
  const { authFetch, showAlert, alert, role } = useGlobalContext();

  const [listOfYears, setlistOfYears] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [listOfHolidaysInSelectedYear, setListOfHolidaysInSelectedYear] =
    useState([]);
  const [listOfHolidaysToDisplay, setListOfHolidaysToDisplay] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({});

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
      .get("/holiday/allYears")
      .then((res) => setlistOfYears(res.data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    listOfYears.length > 0
      ? setSelectedYear(listOfYears[0])
      : setSelectedYear(0);
  }, [listOfYears]);

  const getHolidaysOfSelectedYear = () => {
    authFetch
      .get(`/holiday/${selectedYear}`)
      .then((res) => {
        setListOfHolidaysInSelectedYear(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHolidaysOfSelectedYear();
  }, [isChanged, selectedYear]);

  useEffect(() => {
    const tempArr = [];

    listOfHolidaysInSelectedYear.forEach((holiday) => {
      const tempObj = {};
      tempObj.id = holiday.id;
      tempObj.date = holiday.date + " " + "(" + holiday.day + ")";
      tempObj.name = holiday.name;
      tempArr.push(tempObj);
    });
    setListOfHolidaysToDisplay(tempArr);
    setListOfHolidaysToDisplay(tempArr);
  }, [listOfHolidaysInSelectedYear]);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <AddHolidayModal
        open={isAdding}
        setOpen={setIsAdding}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setIsChanged={setIsChanged}
      />
      <UpdateHolidayModal
        handleClose={handleUpdateClose}
        handleOpen={handleUpdateOpen}
        holiday={currentHoliday}
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
          <div className="w-[60%] m-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
            <div className="flex text-base justify-between w-[95%] pt-8">
              <p className="text-white">List of holidays</p>
              <select
                name="teamId"
                id="team"
                className=""
                onChange={handleChange}
              >
                {listOfYears.map((year) => (
                  <option value={year} key={year} className="text-center">
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[95%] py-8">
              <ListOfHolidaysTable
                listOfHolidays={listOfHolidaysToDisplay}
                handleOpen={handleUpdateOpen}
                setCurrentHoliday={setCurrentHoliday}
                setIsChanged={setIsChanged}
              />
              {role.toLowerCase() === "admin" && (
                <button
                  className="bg-blue-400/70 p-2 mt-4 text-sm text-black rounded-md hover:bg-blue-200 duration-300"
                  onClick={handleOpen}
                >
                  Add +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOfHolidaysPage;

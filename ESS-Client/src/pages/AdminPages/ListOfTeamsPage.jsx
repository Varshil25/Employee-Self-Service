import React, { useEffect, useState } from "react";
import ListOfTeamsTable from "../../components/Teams/ListOfTeamsTable";
import { useGlobalContext } from "../../context/appContext";
import AddTeamModal from "../../components/Teams/AddTeamModal";
import SideBar from "../../components/SideBar";
import CustomAlert from "../../components/utils/CustomAlert";
import UpdateTeamModal from "../../components/Teams/UpdateTeamModal";

function ListOfTeamsPage() {
  const { authFetch, showAlert, alert } = useGlobalContext();
  const [listOfAllTeams, setListOfAllTeams] = useState([]);
  const [listOfTeamsToDisplay, setListOfTeamsToDisplay] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});
  const [employeesInTeam, setEmployeesInTeam] = useState({ map: new Map() });

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
      .get("/team/all")
      .then((res) => setListOfAllTeams(res.data))
      .catch((err) => console.log(err));
  }, [isChanged]);

  useEffect(() => {
    listOfAllTeams.forEach((team) => {
      authFetch
        .get(`/employee/team/${team.id}/all`)
        .then((res) => {
          setEmployeesInTeam(({ map }) => ({
            map: map.set(team.id, res.data),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [listOfAllTeams]);

  useEffect(() => {
    const tempArray = [];
    listOfAllTeams.forEach((team) => {
      const tempObj = {};
      const members = employeesInTeam.map.get(team.id) || [];
      tempObj.id = team.id;
      tempObj.name = team.name;
      tempObj.members = members.length;
      let managers = members.filter(
        (member) =>
          member.role.name.toLowerCase() === "admin" ||
          member.role.name.toLowerCase() === "manager"
      );
      // console.log("managers:", managers);
      tempObj.manager =
        managers.length > 0
          ? managers[0].firstName + " " + managers[0].lastName + " "
          : "Not assigned";

      tempArray.push(tempObj);
    });
    setListOfTeamsToDisplay(tempArray);
  }, [employeesInTeam]);

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <AddTeamModal
        open={isAdding}
        setOpen={setIsAdding}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setIsChanged={setIsChanged}
      />
      <UpdateTeamModal
        handleClose={handleUpdateClose}
        handleOpen={handleUpdateOpen}
        open={isUpdating}
        setIsChanged={setIsChanged}
        setOpen={setIsUpdating}
        team={currentTeam}
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
            <div className="w-[95%] py-8 mx-auto">
              <p className="text-white text-base font-semibold mb-3">Teams</p>
              <ListOfTeamsTable
                listOfTeams={listOfTeamsToDisplay}
                handleOpen={handleUpdateOpen}
                setCurrentTeam={setCurrentTeam}
                setIsChanged={setIsChanged}
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

export default ListOfTeamsPage;

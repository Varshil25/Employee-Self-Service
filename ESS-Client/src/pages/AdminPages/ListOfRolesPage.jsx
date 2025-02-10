import React, { useEffect, useState } from "react";
import AddRoleModal from "../../components/Roles/AddRoleModal";
import SideBar from "../../components/SideBar";
import CustomAlert from "../../components/utils/CustomAlert";
import ListOfRolesTable from "../../components/Roles/ListOfRolesTable";
import { useGlobalContext } from "../../context/appContext";
import UpdateRoleModal from "../../components/Roles/UpdateRoleModal";
import { SettingsPower } from "@mui/icons-material";

function ListOfRolesPage() {
  const { authFetch, showAlert, alert } = useGlobalContext();
  const [listOfAllRoles, setListOfAllRoles] = useState([]);
  const [listOfRolesToDisplay, setListOfRolesToDisplay] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [employeesWithRole, setEmployeesWithRole] = useState({
    map: new Map(),
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [currentRole, setCurrentRole] = useState({});

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
      .then((res) => setListOfAllRoles(res.data))
      .catch((err) => console.log(err));
  }, [isChanged]);

  useEffect(() => {
    listOfAllRoles.forEach((role) => {
      authFetch
        .get(`/employee/role/${role.id}/all`)
        .then((res) => {
          setEmployeesWithRole(({ map }) => ({
            map: map.set(role.id, res.data),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [listOfAllRoles]);

  useEffect(() => {
    console.log(employeesWithRole);
    const tempArray = [];
    listOfAllRoles.forEach((role) => {
      const tempObj = {};
      tempObj.id = role.id;
      tempObj.name = role.name;
      tempObj.employees = employeesWithRole.map.get(role.id)
        ? employeesWithRole.map.get(role.id).length
        : 0;
      tempArray.push(tempObj);
    });
    setListOfRolesToDisplay(tempArray);
  }, [employeesWithRole]);

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <AddRoleModal
        open={isAdding}
        setOpen={setIsAdding}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setIsChanged={setIsChanged}
      />
      <UpdateRoleModal
        handleClose={handleUpdateClose}
        handleOpen={handleUpdateOpen}
        open={isUpdating}
        role={currentRole}
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
            <div className="w-[95%] py-8 mx-auto">
              <p className="text-white text-base font-semibold mb-3">Roles</p>
              <ListOfRolesTable
                listOfRoles={listOfRolesToDisplay}
                setCurrentRole={setCurrentRole}
                setIsChanged={setIsChanged}
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

export default ListOfRolesPage;

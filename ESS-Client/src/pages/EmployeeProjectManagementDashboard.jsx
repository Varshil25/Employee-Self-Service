import React, { useEffect, useState } from "react";
import ProjectTable from "../components/ProjectTable";
import { useGlobalContext } from "../context/appContext";
import SideBar from "../components/SideBar";
import CustomAlert from "../components/utils/CustomAlert";
import moment from "moment";
import ListOfTasksAssignTomeTable from "../components/ListOfTasksAssignTomeTable";

function EmployeeProjectManagementDashboard() {
  const { authFetch, showAlert, alert, userId } = useGlobalContext();
  const [listOfProjects, setListOfProjects] = useState([]);
  const [listOfProjectsToDisplay, setListOfProjectsToDisplay] = useState([]);
  const [listOfTaskAssignToMe, setListOfTaskAssignToMe] = useState([]);
  const [listOfTasksToDisplay, setListOfTasksToDisplay] = useState([]);
  const [taskWithProjectId, setTaskWithProjectId] = useState({
    map: new Map(),
  });

  useEffect(() => {
    authFetch
      .get(`/projectMember/${userId}/allProjects`)
      .then((res) => setListOfProjects(res.data))
      .catch((err) => console.log(err));

    authFetch
      .get(`/task/assignedToMe`)
      .then((res) => setListOfTaskAssignToMe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const countProgress = (tasks) => {
    if (tasks.length == 0) return 0;
    let completedTasks = 0;
    tasks.forEach((task) => {
      if (task.status?.toLowerCase() === "done") completedTasks++;
    });
    return Math.floor((completedTasks / tasks.length) * 100);
  };

  useEffect(() => {
    const extrectedArray = [];
    listOfProjects.forEach((project) => {
      const tempObj = {};
      tempObj.id = project.id;
      tempObj.name = project.name;
      tempObj.status = project.status;
      const managers = project.members.filter(
        (member) => member.role.toLowerCase() === "manager"
      );
      tempObj.manager =
        managers.length > 0
          ? managers[0].employee.firstName + " " + managers[0].employee.lastName
          : "";
      tempObj.status = project.status;
      tempObj.progress = countProgress(project.tasks);
      tempObj.createdOn = moment(project.createdOn).format("YYYY-MM-DD HH:MM");
      extrectedArray.push(tempObj);
    });
    setListOfProjectsToDisplay(extrectedArray);
  }, [listOfProjects]);

  useEffect(() => {
    listOfTaskAssignToMe?.forEach((task) => {
      authFetch
        .get(`/project/getProjectWithTask/${task?.id}`)
        .then((res) => {
          setTaskWithProjectId(({ map }) => ({
            map: map.set(task.id, res.data),
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [listOfTaskAssignToMe]);

  useEffect(() => {
    // console.log(taskWithProjectId);
    const filteredArray = [];
    listOfTaskAssignToMe.forEach((task) => {
      const tempObj = {};
      tempObj.id = task.id;
      tempObj.name = task.name;
      tempObj.assignBy = task.assignBy.firstName + " " + task.assignBy.lastName;
      tempObj.status = task.status;
      tempObj.priority = task.priority;
      tempObj.projectName = taskWithProjectId.map.get(task.id)?.name;
      tempObj.projectId = taskWithProjectId.map.get(task.id)?.id;
      filteredArray.push(tempObj);
    });
    setListOfTasksToDisplay(filteredArray);
  }, [taskWithProjectId]);

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
          <div className="w-[95.5%] m-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
            <div className="w-[95%] py-8">
              <p className="text-white text-base font-semibold mb-3">
                Projects
              </p>
              <ProjectTable projectsToDisplay={listOfProjectsToDisplay} />
            </div>
          </div>
          <div className="w-[95.5%] m-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
            <div className="w-[95%] py-8">
              <p className="text-white text-base font-semibold mb-3">
                Assign to me
              </p>
              <ListOfTasksAssignTomeTable listOfTasks={listOfTasksToDisplay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProjectManagementDashboard;

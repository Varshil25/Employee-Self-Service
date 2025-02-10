import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import ProjectTable from "../components/ProjectTable";
import moment from "moment";

function DisplayListOfProjects() {
  const { authFetch } = useGlobalContext();
  let { status, name } = useParams();
  const [listOfProjects, setListOfProjects] = useState([]);
  const [listOfProjectsToDisplay, setListOfProjectsToDisplay] = useState([]);

  const countProgress = (tasks) => {
    if (tasks.length == 0) return 0;
    let completedTasks = 0;
    tasks.forEach((task) => {
      if (task.status?.toLowerCase() === "done") completedTasks++;
    });
    return Math.floor((completedTasks / tasks.length) * 100);
  };

  const extractInfo = () => {
    const extrectedArray = [];
    if (status) {
      listOfProjects.forEach((project) => {
        console.log("in status");
        if (
          (status?.toLowerCase() !== "all" &&
            status?.toLowerCase() === project.status?.toLowerCase()) ||
          status?.toLowerCase() === "all"
        ) {
          const tempObj = createObject(project);
          extrectedArray.push(tempObj);
        }
      });
    } else {
      const firstAndLastName = name.split(" ");
      const firstName = firstAndLastName[0];
      const lastName = firstAndLastName[1];

      listOfProjects.forEach((project) => {
        for (let i = 0; i < project.members.length; i++) {
          if (
            project.members[i].role.toLowerCase() === "manager" &&
            project.members[i].employee.firstName.toLowerCase() ===
              firstName.toLowerCase() &&
            project.members[i].employee.lastName.toLowerCase() ===
              lastName.toLowerCase()
          ) {
            const tempObj = createObject(project);
            extrectedArray.push(tempObj);
            break;
          }
        }
      });
    }
    setListOfProjectsToDisplay(extrectedArray);
  };

  const createObject = (project) => {
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

    return tempObj;
  };

  useEffect(() => {
    authFetch
      .get("/project/all")
      .then((res) => setListOfProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    extractInfo();
  }, [listOfProjects]);

  return (
    <div className="flex flex-wrap overflow-y-hidden">
      <div className="left w-[15%] h-svh">
        <SideBar />
      </div>
      <div className="right relative top-24 w-[85%] mx-auto">
        <div className="w-[95.5%] m-auto flex flex-row bg-gray-800 backdrop-blur-md rounded-md mb-5">
          <div className="w-[95%] p-5 pb-10 mx-auto">
            <div>
              <p className="text-white text-base font-semibold mb-3">
                All the projects
              </p>
            </div>
            <ProjectTable projectsToDisplay={listOfProjectsToDisplay} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayListOfProjects;

import React, { useEffect, useState } from "react";
import DisplayLeaveRequests from "./DisplayLeaveRequests.jsx";
import CounterCard from "../components/CounterCard.jsx";
import { useGlobalContext } from "../context/appContext.jsx";
import ManagersWithProjectCntTable from "../components/ManagersWithProjectCntTable.jsx";
import SideBar from "../components/SideBar.jsx";

function ProjectManagementDashboard() {
  const { authFetch, userId } = useGlobalContext();
  const [allProjects, setAllProjects] = useState([]);
  const [membersWithProjects, setMembersWithProjects] = useState([]);
  const [statusWithProjectCount, setStatusWithProjectCount] = useState([]);
  const [managersWithProjectsCount, setManagersWithProjectsCount] = useState(
    []
  );

  useEffect(() => {
    authFetch
      .get(`/projectMember/${userId}/allProjects`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authFetch
      .get("/project/all")
      .then((res) => {
        setAllProjects(res.data);
      })
      .catch((err) => console.log(err));

    authFetch
      .get("/projectMember/MANAGER")
      .then((res) => {
        setMembersWithProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let newCnt = 0;
    let inProgressCnt = 0;
    let onholdCnt = 0;
    let completedCnt = 0;
    let canceledCnt = 0;

    allProjects.forEach((project) => {
      if (project.status.toLowerCase() === "new") newCnt++;
      else if (project.status.toLowerCase() === "in_progress") inProgressCnt++;
      else if (project.status.toLowerCase() === "on_hold") onholdCnt++;
      else if (project.status.toLowerCase() === "completed") completedCnt++;
      else canceledCnt++;
    });

    const statusWithCnt = [];

    statusWithCnt.push({ title: "NEW", count: newCnt, color: "blue" });
    statusWithCnt.push({
      title: "IN_PROGRESS",
      count: inProgressCnt,
      color: "green",
    });
    statusWithCnt.push({ title: "ON_HOLD", count: onholdCnt, color: "gray" });
    statusWithCnt.push({
      title: "COMPLETED",
      count: completedCnt,
      color: "blue",
    });
    statusWithCnt.push({
      title: "CANCELED",
      count: canceledCnt,
      color: "red",
    });

    setStatusWithProjectCount(statusWithCnt);
  }, [allProjects]);

  useEffect(() => {
    const tempManagersWithProjectCnt = [];

    const keys = Object.keys(membersWithProjects);

    keys.forEach((key) => {
      const arrayOfProjects = membersWithProjects[key];
      const name = key;
      const totalProjCnt = arrayOfProjects.length;

      let newCnt = 0;
      let inProgressCnt = 0;
      let onholdCnt = 0;
      let completedCnt = 0;
      let canceledCnt = 0;

      membersWithProjects[key].forEach((project) => {
        if (project.status.toLowerCase() === "new") newCnt++;
        else if (project.status.toLowerCase() === "in_progress")
          inProgressCnt++;
        else if (project.status.toLowerCase() === "on_hold") onholdCnt++;
        else if (project.status.toLowerCase() === "completed") completedCnt++;
        else canceledCnt++;
      });

      const tempObj = {};
      tempObj.name = name;
      tempObj.totalProjCnt = totalProjCnt;
      tempObj.newCnt = newCnt;
      tempObj.inProgressCnt = inProgressCnt;
      tempObj.onholdCnt = onholdCnt;
      tempObj.completedCnt = completedCnt;
      tempObj.canceledCnt = canceledCnt;
      tempManagersWithProjectCnt.push(tempObj);
    });
    setManagersWithProjectsCount(tempManagersWithProjectCnt);
  }, [membersWithProjects]);

  const handleTypeChange = (type) => {
    window.location = `/listOfProjects/${type}`;
  };

  return (
    <div className="absolute overflow-x-hidden overflow-y-scroll h-full w-full bg-black flex flex-row">
      <div className="left w-[15%] h-full">
        <SideBar />
      </div>
      <div className="right w-[85%] mx-auto h-screen">
        <div>
          <div className="flex flex-wrap">
            <div className="mt-24 w-[97.5%] mx-auto flex flex-col align-middle items-center justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
              <div
                onClick={() => handleTypeChange("all")}
                className="w-[95%] px-5 my-5"
              >
                <CounterCard
                  countHeading={"TOTAL PROJECTS"}
                  count={allProjects.length}
                  bg={"gray"}
                />
              </div>
              <div className="w-[95%] flex flex-row align-middle items-center justify-between text-center p-5 pb-10">
                {statusWithProjectCount.map((proj) => (
                  <div
                    onClick={() => handleTypeChange(proj.title)}
                    key={proj.title}
                  >
                    <CounterCard
                      countHeading={proj.title}
                      count={proj.count}
                      bg={proj.color}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[97.5%] m-auto flex flex-row align-middle justify-center bg-gray-800 backdrop-blur-md rounded-md mb-5">
              <div className="w-[95%] p-5 pb-10 mx-auto">
                <h1 className="text-white text-base font-semibold mb-3">
                  Project managers
                </h1>
                <ManagersWithProjectCntTable
                  membersWithProjectCnt={managersWithProjectsCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagementDashboard;

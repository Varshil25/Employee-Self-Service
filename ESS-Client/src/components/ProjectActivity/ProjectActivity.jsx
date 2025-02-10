import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/appContext";
import ActivityCard from "./ActivityCard";

function ProjectActivity() {
  const { authFetch } = useGlobalContext();
  const { projectId } = useParams();
  const [logsOfSelectedProject, setLogsOfSelectedProject] = useState([]);
  const [logsWithDate, setLogsWithDate] = useState({});

  useEffect(() => {
    authFetch(`/projectLog/${projectId}`)
      .then((res) => {
        res.data.reverse();
        setLogsOfSelectedProject(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let tempLogsWithDate = logsOfSelectedProject.reduce((acc, log) => {
      let date = log.timestamp.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    }, {});
    setLogsWithDate(tempLogsWithDate);
  }, [logsOfSelectedProject]);

  //   useEffect(() => {
  //     console.log(logsWithDate);
  //   }, [logsWithDate]);

  return (
    <div className="w-full flex flex-col overflow-y-scroll overflow-x-scroll">
      {Object.entries(logsWithDate).map(([date, logsOfDate]) => (
        <ActivityCard key={date} activityDate={date} logsOfDate={logsOfDate} />
      ))}
    </div>
  );
}

export default ProjectActivity;

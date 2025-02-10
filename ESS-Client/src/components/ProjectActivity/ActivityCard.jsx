import React from "react";
import CommitIcon from "@mui/icons-material/Commit";

function ActivityCard({ activityDate, logsOfDate }) {
  return (
    <div className="flex flex-col overflow-scroll">
      <div className="text-neutral-100/50 font-normal overflow-y-scroll flex items-center my-5">
        <div>
          <CommitIcon />
          <span>&nbsp;Commits on &nbsp;</span>
          {activityDate}
        </div>
        <div class="bg-neutral-700 w-10"></div>
      </div>
      <div className="rounded border border-neutral-700 p-3 bg-neutral-800">
        {logsOfDate.map((log, index) => (
          <div key={index}>
            <div className="text-neutral-100/50 font-normal flex justify-between mb-3">
              <p>{log.message}</p>
              <p>
                {log.timestamp.split("T")[1].split(":")[0] +
                  ":" +
                  log.timestamp.split("T")[1].split(":")[1]}
              </p>
            </div>
            <p className="border-b-2 border-neutral-400/10 border-spacing-x-3 mb-3"></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityCard;

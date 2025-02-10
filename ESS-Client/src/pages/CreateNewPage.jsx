import React, { useState } from "react";
import CreateNewEmployee from "../components/CreateNewEmployee";
import CreateNewRole from "../components/CreateNewRole";
import CreateNewTeam from "../components/CreateNewTeam";
import CreateNewProject from "../components/CreateNewProject";

function CreateNewPage() {
  return (
    <div className="flex flex-col">
      <div className="flex relative top-32">
        <div className="w-[70%] m-auto flex flex-row align-middle items-center justify-center bg-gray-100/40 backdrop-blur-md rounded-md mb-5 mx-5">
          <CreateNewEmployee />
        </div>
        <div className="w-[30%] m-auto flex flex-row align-middle items-center justify-center bg-gray-100/40 backdrop-blur-md rounded-md mb-5 mx-5">
          <CreateNewRole />
        </div>
      </div>
      <div className="flex relative top-32">
        <div className="w-[50%] m-auto flex flex-row align-middle items-center justify-center bg-gray-100/40 backdrop-blur-md rounded-md mb-5 mx-5">
          <CreateNewProject />
        </div>
        <div className="w-[50%] m-auto flex flex-row align-middle items-center justify-center bg-gray-100/40 backdrop-blur-md rounded-md mb-5 mx-5">
          <CreateNewTeam />
        </div>
      </div>
    </div>
  );
}

export default CreateNewPage;

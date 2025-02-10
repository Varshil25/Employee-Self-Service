import React, { useState, useEffect } from "react";
import axios from "axios";

function GetAllTemp() {
  const [roles, setRoles] = useState([]);

  const getAllRoles = () => {
    axios.get("http://localhost:8080/api/employee/all").then((response) => {
      setRoles(response.data);
    });
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  return (
    <div className="text-white">
      Getting all data..
      <br />
      <button
        onClick={getAllRoles}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get all roles
      </button>
    </div>
  );
}

export default GetAllTemp;

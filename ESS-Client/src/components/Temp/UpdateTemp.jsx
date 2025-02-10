import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateTemp() {
  const [roleId, setRoleId] = useState(null);
  const [role, setRole] = useState({});

  const handleChange = (e) => {
    setRoleId(e.target.value);
  };

  const getRoleById = (roleId) => {
    axios
      .get(`http://localhost:8080/api/role/${roleId}`)
      .then((res) => setRole(res.data))
      .catch((err) => console.log(err));
  };

  const getRole = () => {
    getRoleById(roleId);
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

  const updateData = () => {
    axios
      .put("http://localhost:8080/api/employee/1", {
        email: "adityakaneriya1711@gmail.com",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="number" onChange={handleChange} />
      <button
        onClick={getRole}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get role
      </button>
      <br />
      <button
        onClick={updateData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update User
      </button>
    </div>
  );
}

export default UpdateTemp;

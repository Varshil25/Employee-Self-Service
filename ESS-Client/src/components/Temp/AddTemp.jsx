import React from "react";
import axios from "axios";

function AddTemp() {
  const addData = () => {
    axios
      .post("http://localhost:8080/api/role", {
        name: "Extra Role",
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
      <button
        onClick={addData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add role
      </button>
    </div>
  );
}

export default AddTemp;

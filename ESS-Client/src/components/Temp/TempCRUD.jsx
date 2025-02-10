import React from "react";
import UpdateTemp from "./UpdateTemp";
import AddTemp from "./AddTemp";
import DeleteTemp from "./DeleteTemp";
import GetAllTemp from "./GetAllTemp";

function TempCRUD() {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="container w-[70%] m-auto align-middle text-center">
        <GetAllTemp />
        <DeleteTemp />
        <AddTemp />
        <UpdateTemp />
      </div>
    </div>
  );
}

export default TempCRUD;

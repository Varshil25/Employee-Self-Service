import React from "react";

function CreateNewTeam() {
  return (
    <div className="w-[95%] flex justify-between p-5 pb-10">
      <div className="w-[100%] m-auto">
        <h1 className="text-xl text-gray-100 align-middle font-medium text-center mb-8">
          Add new Team
        </h1>
        <form className="w-[100%]">
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Team name
              </label>
              <div className="mt-2 mb-2">
                <input type="text" name="name" id="teamName" />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="teamDescription"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Team discription
              </label>
              <div className="mt-2 mb-2">
                <textarea name="description" id="escription" cols="30" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md mt-5 cursor-pointer duration-300 hover:bg-blue-400"
          >
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewTeam;
